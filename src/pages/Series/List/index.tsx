import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';

// eslint-disable-next-line import/no-duplicates
import { format, parseISO } from 'date-fns';

// eslint-disable-next-line import/no-duplicates
import ptBr from 'date-fns/locale/pt-BR';

import MoreOptions from '../../../components/MoreOptions';
import AddSeriesModal from '../Add';

import api from '../../../services/api';

import { SeriesProps } from './interfaces';
import TableSkeleton from '../../../components/TableSkeleton';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatedStatus = {
  active: 'Ativa',
  inactive: 'Inativa',
};

const ListSeries: React.FC = () => {
  const classes = useStyles();

  const [series, setSeries] = useState<SeriesProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function loadSeries() {
      setLoading(true);
      api.get('/series').then(respose => {
        const data = respose.data.map((seriesItem: SeriesProps) => ({
          ...seriesItem,
          formatedDate: format(
            parseISO(seriesItem.created_at),
            "dd 'de' MMM 'de' yyyy",
            {
              locale: ptBr,
            },
          ),
          status: formatedStatus[seriesItem.status],
        }));

        setSeries(data);
        setLoading(false);
      });
    }

    loadSeries();
  }, []);

  if (loading) {
    return (
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}
        >
          <Typography variant="h4" component="h4">
            Listagem de Séries
          </Typography>
          <AddSeriesModal />
        </div>
        <TableContainer component={Paper}>
          <TableSkeleton />
        </TableContainer>
      </>
    );
  }

  return (
    <Grid item xs={12}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}
      >
        <Typography variant="h4" component="h4">
          Listagem de Séries
        </Typography>
        <AddSeriesModal />
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          {!series.length && (
            <caption>Ainda não existem séries cadastradas</caption>
          )}
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nome da Série</TableCell>
              <TableCell align="right">Staus</TableCell>
              <TableCell align="right">Data de Criação</TableCell>
              <TableCell align="right">Mais opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {series.map(seriesItem => (
              <TableRow key={String(seriesItem.id)}>
                <TableCell component="th" scope="row">
                  {seriesItem.id}
                </TableCell>
                <TableCell align="right">{seriesItem.name}</TableCell>
                <TableCell align="right">{seriesItem.status}</TableCell>
                <TableCell align="right">{seriesItem.formatedDate}</TableCell>
                <TableCell align="right">
                  <MoreOptions options={['Visualizar', 'Deletar']} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ListSeries;
