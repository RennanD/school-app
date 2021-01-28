import React, { useEffect, useState } from 'react';

import {
  Snackbar,
  SnackbarOrigin,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  DialogTitle,
  MenuItem,
  InputLabel,
  Grid,
  Select,
} from '@material-ui/core';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import api from '../../../services/api';

import { SeriesProps } from '../../Series/List/interfaces';

interface State extends SnackbarOrigin {
  open: boolean;
}

const AddClassesModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [className, setClassName] = useState('');
  const [seriesId, setSeriesId] = useState<number>();
  // const [error] = useState('');
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  const [series, setSeries] = useState<SeriesProps[]>([]);

  const { vertical, horizontal } = state;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({ ...state, open: false });
  };

  const handleRegisterSeries = async () => {
    console.log(className);
  };

  useEffect(() => {
    api.get('/series').then(response => {
      setSeries(response.data);
    });
  }, []);

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Cadastrar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Formulário - Cadastrar Série
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem vel nisi ipsam voluptate molestias.
          </DialogContentText>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={seriesId}
                onChange={e => setSeriesId(e.target.value as number)}
              >
                {series.map(seriesItem => (
                  <MenuItem value={seriesItem.id}>{seriesItem.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                // error={!!error}
                // helperText={error && error}
                autoFocus
                margin="dense"
                id="name"
                label="Nome da série"
                type="text"
                fullWidth
                onChange={e => setClassName(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRegisterSeries} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddClassesModal;
