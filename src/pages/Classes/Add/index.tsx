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
  FormControlLabel,
  Checkbox,
  FormLabel,
} from '@material-ui/core';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import api from '../../../services/api';

import { SeriesProps } from '../../Series/List/interfaces';
import { SubjectsProps } from '../../Subjects/List/interfaces';

interface State extends SnackbarOrigin {
  open: boolean;
}

const AddClassesModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [className, setClassName] = useState('');
  const [seriesId, setSeriesId] = useState<number>();
  const [code, setCode] = useState('');
  const [shift, setShift] = useState('');
  const [subjects, setSubjetcs] = useState<SubjectsProps[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
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

  const handleControllSubjectsToAdd = (subject: number) => {
    const findSubject = selectedSubjects.find(
      selectedSubject => selectedSubject === subject,
    );

    if (findSubject) {
      const filteredArray = selectedSubjects.filter(
        selectedSubject => selectedSubject !== subject,
      );

      setSelectedSubjects(filteredArray);
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleRegisterClass = async () => {
    if (!className || !code || !shift || !selectedSubjects) {
      console.log('preencha todos do campos');
    } else {
      await api.post('/classes', {
        name: className,
        code,
        series_id: seriesId,
        shift,
        subjects: selectedSubjects,
      });
      setOpen(false);
      setState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
      });
    }
  };

  useEffect(() => {
    api.get('/series').then(response => {
      setSeries(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/subjects').then(response => {
      setSubjetcs(response.data);
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

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-helper-label">
                Selecione uma série
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                label
                id="demo-simple-select-helper"
                placeholder="Selecione uma série"
                value={seriesId}
                onChange={e => setSeriesId(e.target.value as number)}
                fullWidth
              >
                <MenuItem selected disabled value="">
                  Selecione
                </MenuItem>
                {series.map(seriesItem => (
                  <MenuItem key={seriesItem.id} value={seriesItem.id}>
                    {seriesItem.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="name">Nome da turma</InputLabel>
              <TextField
                // error={!!error}
                // helperText={error && error}
                id="name"
                type="text"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => setClassName(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid style={{ marginTop: 15 }} container spacing={2}>
            <Grid item xs={6}>
              <InputLabel id="code">Código da turma</InputLabel>
              <TextField
                // error={!!error}
                // helperText={error && error}
                id="code"
                type="text"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => setCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-helper-label">
                Selecione um turno
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                label
                id="demo-simple-select-helper"
                placeholder="Selecione uma série"
                value={shift}
                onChange={e => setShift(e.target.value as string)}
                fullWidth
              >
                <MenuItem selected disabled value="">
                  Selecione
                </MenuItem>
                {['Manhã', 'Tarde', 'Integral'].map(shiftItem => (
                  <MenuItem key={shiftItem} value={shiftItem}>
                    {shiftItem}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid style={{ marginTop: 10 }}>
            <FormLabel component="legend">
              Selecione as disciplinas desta turma
            </FormLabel>
            {subjects.map(subject => (
              <FormControlLabel
                key={subject.id}
                control={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <Checkbox
                    onChange={() => handleControllSubjectsToAdd(subject.id)}
                    name="gilad"
                  />
                }
                label={subject.name}
              />
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRegisterClass} color="primary">
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
          Turma Cadstrada com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddClassesModal;
