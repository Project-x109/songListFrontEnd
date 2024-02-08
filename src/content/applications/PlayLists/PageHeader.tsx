import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from 'src/redux/reducers/rootReducer';
import SimpleDialog from 'src/content/applications/PlayLists/SimpleDialog';

function PageHeader() {
  const [open, setOpen] = useState(false);
  const successMessage = useSelector((state: RootState) => state.song.success);
  const errorMessage = useSelector((state: RootState) => state.song.error);
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
  }, [successMessage, errorMessage]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <ToastContainer position="bottom-right" />
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Musics
        </Typography>
        <Typography variant="subtitle2">These are A list of Music</Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleOpen}
        >
          Add New Music
        </Button>
        <SimpleDialog action="add" open={open} onClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
