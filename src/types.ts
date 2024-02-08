export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface COUNT {
  _id: string;
  count: number;
}
export interface DATA {
  artistCount: number;
  albumCount: number;
  genreCount: number;
}
