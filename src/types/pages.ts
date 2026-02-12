export interface BaseSearchParams {
  page?: string;
}

export interface FilterSearchParams extends BaseSearchParams {
  type?: string;
}

export interface FullSearchParams extends FilterSearchParams {
  q?: string;
  status?: string;
  order_by?: string;
  sort?: string;
}

export interface ScheduleSearchParams extends BaseSearchParams {
  day?: string;
}

export interface ProducerSearchParams extends BaseSearchParams {
  q?: string;
  order_by?: string;
  sort?: string;
  letter?: string;
}

export interface MalIdParams {
  malId: string;
  title: string;
}

export interface SeasonParams {
  year: string;
  season: string;
}

export interface PagePropsWithSearch<T = BaseSearchParams> {
  searchParams: Promise<T>;
}

export interface PagePropsWithParams<P = MalIdParams> {
  params: Promise<P>;
}

export interface PagePropsWithBoth<P = MalIdParams, S = BaseSearchParams> {
  params: Promise<P>;
  searchParams: Promise<S>;
}

export type ListPageProps = PagePropsWithSearch<FilterSearchParams>;
export type SearchPageProps = PagePropsWithSearch<FullSearchParams>;
export type DetailPageProps = PagePropsWithParams<MalIdParams>;
export type DetailWithPaginationProps = PagePropsWithBoth<MalIdParams, BaseSearchParams>;
export type SeasonPageProps = PagePropsWithBoth<SeasonParams, FilterSearchParams>;
export type SchedulePageProps = PagePropsWithSearch<ScheduleSearchParams>;
export type ProducerPageProps = PagePropsWithSearch<ProducerSearchParams>;
