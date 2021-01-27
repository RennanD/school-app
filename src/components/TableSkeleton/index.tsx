import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

// import { Container } from './styles';

const data = [1, 2, 3, 4];

const TableSkeleton: React.FC = () => (
  <Table aria-label="caption table">
    <TableHead>
      <TableRow>
        <TableCell>
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="right">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="right">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="right">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="right">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(item => (
        <TableRow key={String(item)}>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell align="right">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell align="right">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell align="right">
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell align="right">
            <Grid container spacing={3}>
              <Grid item xs={4} />
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Skeleton animation="wave" />
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default TableSkeleton;
