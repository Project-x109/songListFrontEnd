import { createReducer } from '@reduxjs/toolkit';
import { statisticsAction } from '../actions/statisticsAction';
import { COUNT, DATA } from 'src/types';
interface CountState {
  errorMessage?: string[];
  data?: COUNT[];
  artists?: COUNT[];
  statCount?: DATA;
}

const initialState: CountState = {
  errorMessage: null,
  data: null,
  artists: null,
  statCount: null
};

const countReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(statisticsAction.fetchCountByGenreSuccess, (state, action) => {
      state.data = action.payload.data;
      state.errorMessage = null;
    })
    .addCase(statisticsAction.fetchCountByGenreError, (state, action) => {
      state.data = null;
      state.errorMessage = action.payload.errors;
    })
    .addCase(
      statisticsAction.fetchCountPopularArtistSuccess,
      (state, action) => {
        state.artists = action.payload.data;
        state.errorMessage = null;
      }
    )
    .addCase(statisticsAction.fetchCountPopularArtistError, (state, action) => {
      state.data = null;
      state.errorMessage = action.payload.errors;
    })
    .addCase(statisticsAction.fetchStatisticsSuccess, (state, action) => {
      state.statCount = action.payload.data;
      state.errorMessage = null;
    })
    .addCase(statisticsAction.fetchStatisticsError, (state, action) => {
      state.statCount = null;
      state.errorMessage = action.payload.errors;
    });
});
export default countReducer;
