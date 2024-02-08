import { createAction } from '@reduxjs/toolkit';
import { Song } from '../../types';

// Action types
export const fetchSongs = createAction('FETCH_SONGS');
export const addSong = createAction<Song>('ADD_SONG');
export const updateSong = createAction<{ id: string; data: Partial<Song> }>(
  'UPDATE_SONG'
);
export const deleteSong = createAction<string>('DELETE_SONG');
export const fetchCountRequest = createAction('FETCH_COUNT_SUCCESS');
export const clereMessages = createAction('CLEAR_MESSAGES');
export const fetchSongsSuccess = createAction<{
  song: Song[];
  message: string;
}>('FETCH_SONGS_SUCCESS');
export const fetchSongsFailure = createAction<string>('FETCH_SONGS_FAILURE');
export const addSongSuccess = createAction<{ song: Song; message: string }>(
  'ADD_SONG_SUCCESS'
);
export const addSongFailure = createAction<{ errors: string[] }>(
  'ADD_SONG_FAILURE'
);
export const updateSongSuccess = createAction<{ song: Song; message: string }>(
  'UPDATE_SONG_SUCCESS'
);
export const updateSongFailure = createAction<{ errors: string[] }>(
  'UPDATE_SONG_FAILURE'
);
export const deleteSongSuccess = createAction<{ song: Song; message: string }>(
  'DELETE_SONG_SUCCESS'
);
export const deleteSongFailure = createAction<{ errors: string[] }>(
  'DELETE_SONG_FAILURE'
);



// Combine all actions into a single object
export const songActions = {
  fetchSongs,
  addSong,
  updateSong,
  deleteSong,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  addSongFailure,
  updateSongSuccess,
  updateSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
  clereMessages
};
