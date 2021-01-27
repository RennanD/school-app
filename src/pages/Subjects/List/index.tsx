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

import { SubjectsProps } from './interfaces';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatedStatus = {
  active: 'Ativo',
  inactive: 'Inativo',
};

const SubjectsList: React.FC = () => {
  const classes = useStyles();

  const [subjects, setSubjects] = useState<SubjectsProps[]>([]);

  useEffect(() => {
    function loadSubjects() {
      api.get('/subjects').then(respose => {
        const data = respose.data.map((subject: SubjectsProps) => ({
          ...subject,
          formattedDate: format(
            parseISO(subject.created_at),
            "dd 'de' MMM 'de' yyyy",
            {
              locale: ptBr,
            },
          ),
          status: formatedStatus[subject.status],
        }));

        setSubjects(data);
      });
    }

    loadSubjects();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        {!subjects.length && (
          <caption>Ainda não existem disciplinas cadastradas</caption>
        )}
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nome da Disciplina</TableCell>
            <TableCell align="right">Staus</TableCell>
            <TableCell align="right">Data de Criação</TableCell>
            <TableCell align="right">Mais Opções</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map(subject => (
            <TableRow key={String(subject.id)}>
              <TableCell component="th" scope="row">
                {subject.id}
              </TableCell>
              <TableCell align="right">{subject.name}</TableCell>
              <TableCell align="right">{subject.status}</TableCell>
              <TableCell align="right">{subject.formattedDate}</TableCell>
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

export default SubjectsList;
