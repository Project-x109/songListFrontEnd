import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, clereMessages } from 'src/redux/actions/songActions';
import { RootState } from 'src/redux/reducers/rootReducer';
import SongsTable from './SongsTable';

function Songs() {
  const songs = useSelector((state: RootState) => state.song.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(clereMessages());
  }, [dispatch]);

  return (
    <Card>
      <SongsTable songs={songs} />
    </Card>
  );
}

export default Songs;
