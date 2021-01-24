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

import MoreOptions from '../../../components/MoreOptions';

import api from '../../../services/api';

import { ClassProps } from './interfaces';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatedStatus = {
  active: 'Ativo',
  inactive: 'Inativo',
};

const ListClasses: React.FC = () => {
  const classes = useStyles();

  const [series, setSeries] = useState<ClassProps[]>([]);

  useEffect(() => {
    function loadSeries() {
      api.get('/classes').then(respose => {
        const data = respose.data.map((classItem: ClassProps) => ({
          ...classItem,
          formatedDate: format(
            parseISO(classItem.created_at),
            "dd 'de' MMM 'de' yyyy",
            {
              locale: ptBr,
            },
          ),
          status: formatedStatus[classItem.status],
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
            <TableCell align="right">Nome da Turma</TableCell>
            <TableCell align="right">Código da Turma</TableCell>
            <TableCell align="right">Turno</TableCell>
            <TableCell align="right">Série da Turma</TableCell>
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
              <TableCell align="right">{seriesItem.code}</TableCell>
              <TableCell align="right">{seriesItem.shift}</TableCell>
              <TableCell align="right">{seriesItem.series.name}</TableCell>
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

export default ListClasses;
