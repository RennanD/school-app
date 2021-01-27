import React, { useState } from 'react';

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
} from '@material-ui/core';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import api from '../../../services/api';

export interface State extends SnackbarOrigin {
  open: boolean;
}

const AddSeriesModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [seriesName, setSeriesName] = useState('');
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  const { vertical, horizontal } = state;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({ ...state, open: false });
  };
  const handleRegisterSeries = async () => {
    await api.post('/series', {
      name: seriesName,
    });
    setOpen(false);
    setState({
      open: true,
      vertical: 'top',
      horizontal: 'right',
    });
  };

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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome da série"
            type="text"
            fullWidth
            onChange={e => setSeriesName(e.target.value)}
          />
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

export default AddSeriesModal;
