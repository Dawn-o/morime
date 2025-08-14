-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  sfw_mode BOOLEAN DEFAULT true,
  theme_preference TEXT DEFAULT 'system' CHECK (theme_preference IN ('light', 'dark', 'system')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_anime_lists table
CREATE TABLE IF NOT EXISTS public.user_anime_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mal_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('watching', 'completed', 'plan_to_watch', 'dropped', 'on_hold')),
  progress INTEGER DEFAULT 0,
  score INTEGER CHECK (score >= 1 AND score <= 10),
  started_date DATE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, mal_id)
);

-- Create user_manga_lists table
CREATE TABLE IF NOT EXISTS public.user_manga_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mal_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('reading', 'completed', 'plan_to_read', 'dropped', 'on_hold')),
  chapters_read INTEGER DEFAULT 0,
  volumes_read INTEGER DEFAULT 0,
  score INTEGER CHECK (score >= 1 AND score <= 10),
  started_date DATE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, mal_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_anime_lists_user_id ON public.user_anime_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_user_anime_lists_mal_id ON public.user_anime_lists(mal_id);
CREATE INDEX IF NOT EXISTS idx_user_anime_lists_status ON public.user_anime_lists(status);
CREATE INDEX IF NOT EXISTS idx_user_manga_lists_user_id ON public.user_manga_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_user_manga_lists_mal_id ON public.user_manga_lists(mal_id);
CREATE INDEX IF NOT EXISTS idx_user_manga_lists_status ON public.user_manga_lists(status);

-- Set up Row Level Security (RLS) policies

-- Profiles policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- User anime lists policies
ALTER TABLE public.user_anime_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own anime lists" ON public.user_anime_lists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own anime list entries" ON public.user_anime_lists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own anime list entries" ON public.user_anime_lists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own anime list entries" ON public.user_anime_lists
  FOR DELETE USING (auth.uid() = user_id);

-- User manga lists policies
ALTER TABLE public.user_manga_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own manga lists" ON public.user_manga_lists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own manga list entries" ON public.user_manga_lists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own manga list entries" ON public.user_manga_lists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own manga list entries" ON public.user_manga_lists
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.user_anime_lists
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.user_manga_lists
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
