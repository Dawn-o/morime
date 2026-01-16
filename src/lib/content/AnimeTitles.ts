interface AnimeTypeInfo {
  title: string;
  description: string;
}

export function getAnimeTitle(type: string | undefined): AnimeTypeInfo {
  switch (type) {
    case "all":
      return {
        title: "Top Anime",
        description: "Discover the highest-rated anime of all time",
      };
    case "tv":
      return {
        title: "Top TV Series",
        description: "Best television anime series ranked by ratings",
      };
    case "movie":
      return {
        title: "Top Movies",
        description: "Highest-rated anime movies and films",
      };
    case "ova":
      return {
        title: "Top OVA",
        description: "Best Original Video Animation releases",
      };
    case "ona":
      return {
        title: "Top ONA",
        description: "Top-rated Original Net Animation series",
      };
    case "special":
      return {
        title: "Top Specials",
        description: "Best anime specials and one-shots",
      };
    case "airing":
      return {
        title: "Top Airing",
        description: "Currently airing anime ranked by popularity",
      };
    case "upcoming":
      return {
        title: "Most Anticipated",
        description: "Upcoming anime with highest anticipation",
      };
    case "bypopularity":
      return {
        title: "Most Popular",
        description: "Anime ranked by member count and popularity",
      };
    case "favorite":
      return {
        title: "Most Favorited",
        description: "Anime with the most user favorites",
      };
    default:
      return {
        title: "Top Anime",
        description: "Explore the best anime collections",
      };
  }
}
