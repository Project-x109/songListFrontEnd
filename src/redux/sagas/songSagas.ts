import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAllSongs as fetchSongs,
  addSong as addSongApi,
  updateSong as updateSongApi,
  deleteSong as deleteSongApi
} from '../../services/api'; // Assuming you have defined API functions
import {
  addSong,
  deleteSong,
  updateSong,
  songActions
} from '../actions/songActions';
import { ActionType } from 'typesafe-actions';
function* fetchSongsSaga() {
  try {
    const songs = yield call(fetchSongs);
    if (songs.success) {
      yield put(songActions.fetchSongsSuccess(songs));
    } else {
      yield put(songActions.fetchSongsFailure(songs));
    }
  } catch (error) {
    yield put(songActions.fetchSongsFailure(error.message));
  }
}

function* addSongSaga(action: ActionType<typeof addSong>) {
  try {
    const newSong = yield call(addSongApi, action.payload);
    if (newSong.success) {
      yield put(songActions.addSongSuccess(newSong));
    } else {
      yield put(songActions.addSongFailure(newSong));
    }
  } catch (error) {
    yield put(songActions.addSongFailure(error.message));
  }
}

function* updateSongSaga(action: ActionType<typeof updateSong>) {
  try {
    const updatedSong = yield call(
      updateSongApi,
      action.payload.id,
      action.payload.data
    );
    if (updatedSong.success) {
      yield put(
        songActions.updateSongSuccess({
          song: updatedSong.song,
          message: updatedSong.message
        })
      );
    } else {
      yield put(songActions.updateSongFailure({ errors: updatedSong.error }));
    }
  } catch (error) {
    yield put(songActions.updateSongFailure({ errors: [error.message] }));
  }
}

function* deleteSongSaga(action: ActionType<typeof deleteSong>) {
  try {
    const deleteSong = yield call(deleteSongApi, action.payload);
    if (deleteSong.success) {
      yield put(
        songActions.deleteSongSuccess({
          song: deleteSong.song,
          message: deleteSong.message
        })
      );
    } else {
      yield put(songActions.deleteSongFailure({ errors: deleteSong.errors }));
    }
  } catch (error) {
    yield put(songActions.deleteSongFailure(error.message));
  }
}

export function* songsSaga() {
  yield takeLatest(songActions.fetchSongs.type, fetchSongsSaga);
  yield takeLatest(songActions.addSong.type, addSongSaga);
  yield takeLatest(songActions.updateSong.type, updateSongSaga);
  yield takeLatest(songActions.deleteSong.type, deleteSongSaga);
}
