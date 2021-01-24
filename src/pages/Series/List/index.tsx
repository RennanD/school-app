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
} from '@material-ui/core';

// eslint-disable-next-line import/no-duplicates
import { format, parseISO } from 'date-fns';

// eslint-disable-next-line import/no-duplicates
import ptBr from 'date-fns/locale/pt-BR';

import { SeriesProps } from './interfaces';
import api from '../../../services/api';
import MoreOptions from '../../../components/MoreOptions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatedStatus = {
  active: 'Ativo',
  inactive: 'Inativo',
};

const ListSeries: React.FC = () => {
  const classes = useStyles();

  const [series, setSeries] = useState<SeriesProps[]>([]);

  useEffect(() => {
    function loadSeries() {
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
      });
    }

    loadSeries();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
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
  );
};

export default ListSeries;
