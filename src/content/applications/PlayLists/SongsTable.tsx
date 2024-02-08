import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SimpleDialog from './SimpleDialog';
import { Song } from '../../../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from 'src/redux/reducers/rootReducer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteSong, clereMessages } from 'src/redux/actions/songActions';
import { useDispatch } from 'react-redux';
import {
  fetchCountRequestByGenre,
  fetchCountPopularArtist,
  fetchStatistics
} from 'src/redux/actions/statisticsAction';

interface RecentSongsTableProps {
  songs: Song[];
}

const SongsTable: FC<RecentSongsTableProps> = ({ songs }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null); // State to store the selected song

  const successMessage = useSelector((state: RootState) => state.song.success);
  const errorMessage = useSelector((state: RootState) => state.song.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: successMessage
      });
    } else {
      errorMessage?.map((singleError, index) => {
        toast.error(singleError);
        return null;
      });
    }
    dispatch(fetchCountRequestByGenre());
    dispatch(fetchCountPopularArtist());
    dispatch(fetchStatistics());
    dispatch(clereMessages());
  }, [successMessage, errorMessage]);
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedSongs = songs.slice(page * limit, page * limit + limit);
  const theme = useTheme();

  const handleEditSong = (song: Song): void => {
    setSelectedSong(song);
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };
  const handleDelete = (song) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (song) {
          dispatch(deleteSong(song._id));
        }
      }
    });
  };

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSongs.map((song) => (
              <TableRow hover key={song._id}>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell>{song.genre}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Order" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small"
                      onClick={() => handleEditSong(song)} // Call handleEditSong function with the selected song
                    >
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Order" arrow>
                    <IconButton
                      sx={{
                        '&:hover': { background: theme.colors.error.lighter },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small"
                      onClick={() => handleDelete(song)}
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box p={2}>
          <TablePagination
            component="div"
            count={songs.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </TableContainer>
      <SimpleDialog
        open={openModal}
        onClose={handleCloseModal}
        action="update"
        song={selectedSong}
      />
    </div>
  );
};

SongsTable.propTypes = {
  songs: PropTypes.array.isRequired
};

export default SongsTable;
