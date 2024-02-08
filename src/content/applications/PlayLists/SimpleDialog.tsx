import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Tooltip,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSong, updateSong } from 'src/redux/actions/songActions';
import { Song } from 'src/types';
import {
  fetchCountRequestByGenre,
  fetchCountPopularArtist,
  fetchStatistics
} from 'src/redux/actions/statisticsAction';
interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  action: 'add' | 'update';
  song?: Song; // Optional, only used for updating
}

function SimpleDialog({ open, onClose, action, song }: SimpleDialogProps) {
  const dispatch = useDispatch();
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (song) {
      setArtist(song.artist || '');
      setAlbum(song.album || '');
      setGenre(song.genre || '');
      setTitle(song.title || '');
      setId(song._id || '');
    }
  }, [song]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!artist || !album || !genre || !title) {
      toast.error('Please fill in all fields.');
      return;
    }

    const songData = { artist, album, genre, title };

    if (action === 'add') {
      dispatch(addSong(songData));
      dispatch(fetchCountRequestByGenre());
      dispatch(fetchCountPopularArtist());
      dispatch(fetchStatistics());
      setArtist('');
      setAlbum('');
      setGenre('');
      setTitle('');
    } else if (action === 'update' && song) {
      dispatch(updateSong({ id: id, data: { ...song, ...songData } }));
      dispatch(
        fetchCountRequestByGenre(),
        fetchCountPopularArtist(),
        fetchStatistics()
      );
    }
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <ToastContainer position="bottom-right" />
      <DialogTitle>
        {action === 'add' ? 'Add New Music' : 'Update Music'}
      </DialogTitle>
      <DialogContent>
        <Tooltip arrow title="Add Artist Name" placement="top">
          <TextField
            required
            autoFocus
            margin="dense"
            label="Artist"
            id="outlined-required"
            type="text"
            fullWidth
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </Tooltip>
        <Tooltip arrow title="Add Album Name" placement="top">
          <TextField
            required
            margin="dense"
            label="Album"
            type="text"
            fullWidth
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </Tooltip>
        <Tooltip arrow title="Add Title" placement="top">
          <TextField
            required
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Tooltip>
        <Tooltip title="Select Release Genre" placement="top">
          <FormControl fullWidth>
            <InputLabel required id="genre-label">
              Genre
            </InputLabel>
            <Select
              required
              sx={{ marginTop: '5px' }}
              margin="dense"
              labelId="genre-label"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <MenuItem value={genre}>{genre}</MenuItem>
              <MenuItem value="Pop">Pop</MenuItem>
              <MenuItem value="Rock">Rock</MenuItem>
              <MenuItem value="Hip Hop">Hip Hop</MenuItem>
              <MenuItem value="Electronic">Electronic</MenuItem>
              <MenuItem value="Country">Country</MenuItem>
              <MenuItem value="Jazz">Jazz</MenuItem>
              <MenuItem value="Blues">Blues</MenuItem>
              <MenuItem value="Reggae">Reggae</MenuItem>
              <MenuItem value="Classical">Classical</MenuItem>
              <MenuItem value="Folk">Folk</MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
      </DialogContent>
      <Button sx={{ marginBottom: '5px' }} onClick={(e) => handleSave(e)}>
        Save
      </Button>
    </Dialog>
  );
}

export default SimpleDialog;
