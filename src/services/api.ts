import axios from 'axios';

const API_URL = 'http://localhost:4000/songs'; // Update the URL with your backend API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Define functions to make API requests

export const getAllSongs = async () => {
  try {
    const response = await api.get('/songs');
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      } else {
        throw new Error(
          'Failed to fetch song: An error occurred on the server'
        );
      }
    } else {
      throw new Error('Failed to fetch songs');
    }
  }
};

export const addSong = async (songData: any) => {
  try {
    const response = await api.post('/songs', songData);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      } else {
        throw new Error('Failed to add song: An error occurred on the server');
      }
    } else {
      throw new Error('Failed to add song: No response received from server');
    }
  }
};

export const updateSong = async (id: string, songData: any) => {
  try {
    const response = await api.put(`/songs/${id}`, songData);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      } else {
        throw new Error(
          'Failed to update song: An error occurred on the server'
        );
      }
    } else {
      throw new Error(
        'Failed to update song: No response received from server'
      );
    }
  }
};

export const deleteSong = async (id: string) => {
  try {
    const response = await api.delete(`/songs/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      } else {
        throw new Error(
          'Failed to delete song: An error occurred on the server'
        );
      }
    } else {
      throw new Error(
        'Failed to delete song: No response received from server'
      );
    }
  }
};
export const getSongsCountByGenre = async () => {
  try {
    const response = await api.get('/get-songs-count-by-genre');
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      } else {
        throw new Error(
          'Failed to fetch song: An error occurred on the server'
        );
      }
    } else {
      throw new Error('Failed to fetch songs');
    }
  }
};
export const getMostPopularArtist = async () => {
  try {
    const response = await api.get('/get-popular-artist');
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      } else {
        throw new Error(
          'Failed to fetch artist: An error occurred on the server'
        );
      }
    } else {
      throw new Error('Failed to fetch songs');
    }
  }
};

export const getStatistics = async () => {
  try {
    const response = await api.get('/get-statistics');
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      } else {
        throw new Error(
          'Failed to fetch stat: An error occurred on the server'
        );
      }
    } else {
      throw new Error('Failed to fetch stat');
    }
  }
};
