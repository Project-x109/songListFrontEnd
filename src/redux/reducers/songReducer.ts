import { createReducer } from '@reduxjs/toolkit';
import { Song } from '../../types';
import { songActions } from '../actions/songActions';

interface SongState {
  songs: Song[];
  error: string[] | null; // Update to array of strings
  success: string | null;
}

const initialState: SongState = {
  songs: [],
  error: null,
  success: null
};

const songReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(songActions.fetchSongsSuccess, (state, action) => {
      state.songs = action.payload.song;
      state.error = null;
      state.success = null;
    })
    .addCase(songActions.fetchSongsFailure, (state, action) => {
      state.error = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
    })
    .addCase(songActions.addSongSuccess, (state, action) => {
      state.songs.push(action.payload.song);
      state.error = [];
      state.success = action.payload.message;
    })
    .addCase(songActions.addSongFailure, (state, action) => {
      state.error = action.payload.errors;
      state.success = null;
    })
    .addCase(songActions.updateSongSuccess, (state, action) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload.song._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload.song;
      }
      state.error = [];
      state.success = action.payload.message;
    })
    .addCase(songActions.updateSongFailure, (state, action) => {
      state.error = action.payload.errors;
      state.success = null;
    })
    .addCase(songActions.deleteSongSuccess, (state, action) => {
      state.songs = state.songs.filter(
        (song) => song._id !== action.payload.song._id
      );
      state.error = [];
      state.success = action.payload.message;
    })
    .addCase(songActions.deleteSongFailure, (state, action) => {
      state.error = action.payload.errors;
      state.success = null;
    })
    .addCase(songActions.clereMessages, (state) => {
      state.error = null;
      state.success = null;
    });
});

export default songReducer;
