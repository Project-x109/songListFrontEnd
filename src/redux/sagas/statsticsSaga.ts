import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getSongsCountByGenre,
  getMostPopularArtist,
  getStatistics
} from '../../services/api';
import {
  fetchCountRequestByGenre,
  fetchCountByGenreSuccess,
  fetchCountByGenreError,
  fetchCountPopularArtist,
  fetchCountPopularArtistSuccess,
  fetchCountPopularArtistError,
  fetchStatistics,
  fetchStatisticsSuccess,
  fetchStatisticsError
} from '../actions/statisticsAction';

function* fetchCountRequestByGenreSaga() {
  try {
    const fetchCountRequestByGenre = yield call(getSongsCountByGenre);
    if (fetchCountRequestByGenre.success) {
      yield put(fetchCountByGenreSuccess(fetchCountRequestByGenre));
    } else {
      yield put(fetchCountByGenreError(fetchCountRequestByGenre));
    }
  } catch (error) {
    yield put(fetchCountByGenreError(error.message));
  }
}
function* fetchCountPopularArtistSaga() {
  try {
    const fetchCountPopularArtist = yield call(getMostPopularArtist);
    if (fetchCountPopularArtist.success) {
      yield put(
        fetchCountPopularArtistSuccess({ data: fetchCountPopularArtist.data })
      );
    } else {
      yield put(
        fetchCountPopularArtistError({ errors: fetchCountPopularArtist.errors })
      );
    }
  } catch (error) {
    yield put(fetchCountPopularArtistError(error.message));
  }
}

function* fetchStatisticsSaga() {
  try {
    const fetchStatistics = yield call(getStatistics);
    if (fetchStatistics.success) {
      yield put(fetchStatisticsSuccess({ data: fetchStatistics.data }));
    } else {
      yield put(fetchStatisticsError({ errors: fetchStatistics.errors }));
    }
  } catch (error) {
    yield put(fetchStatisticsError(error.message));
  }
}

export function* statisticsSaga() {
  yield takeLatest(fetchCountRequestByGenre.type, fetchCountRequestByGenreSaga);
  yield takeLatest(fetchCountPopularArtist.type, fetchCountPopularArtistSaga);
  yield takeLatest(fetchStatistics.type, fetchStatisticsSaga);
}
