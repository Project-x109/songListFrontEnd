import { createAction } from '@reduxjs/toolkit';
import { COUNT, DATA } from 'src/types';
export const fetchCountRequestByGenre = createAction(
  'FETCH_COUNT_REQUEST_BY_GENRE'
);
export const fetchCountByGenreSuccess = createAction<{ data: COUNT[] }>(
  'FETCH_COUNT_BY_GENRE_SUCCESS'
);
export const fetchCountByGenreError = createAction<{ errors: string[] }>(
  'FETCH_COUNT_BY_GENRE_ERROR'
);
export const fetchCountPopularArtist = createAction(
  'FETCH_COUNT_POPULAR_ARTIST'
);
export const fetchCountPopularArtistSuccess = createAction<{ data: COUNT[] }>(
  'FETCH_COUNT_POPULAR_ARTIST_SUCCESS'
);
export const fetchCountPopularArtistError = createAction<{ errors: string[] }>(
  'FETCH_COUNT_POPULAR_ARTIST_ERROR'
);

export const fetchStatistics = createAction('FETCH_STATISTICS');
export const fetchStatisticsSuccess = createAction<{ data: DATA }>(
  'FETCH_STATISTICS_SUCCESS'
);
export const fetchStatisticsError = createAction<{ errors: string[] }>(
  'FETCH_STATISTICS_ERROR'
);
export const statisticsAction = {
  fetchCountRequestByGenre,
  fetchCountByGenreSuccess,
  fetchCountByGenreError,
  fetchCountPopularArtist,
  fetchCountPopularArtistSuccess,
  fetchCountPopularArtistError,
  fetchStatistics,
  fetchStatisticsSuccess,
  fetchStatisticsError
};
