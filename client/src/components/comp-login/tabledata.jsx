import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(cell1, cell2, cell3, cell4, cell5) {
  return { cell1, cell2, cell3, cell4, cell5 };
}



export default function DenseTable(props) {
    //geting data from previous page
    const row = props.state.data;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>cell1</TableCell>
            <TableCell align="right">cell2</TableCell>
            <TableCell align="right">cell3&nbsp;(g)</TableCell>
            <TableCell align="right">cell4&nbsp;(g)</TableCell>
            <TableCell align="right">cel5&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.cell1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.cell1}
              </TableCell>
              <TableCell align="right">{row.cell2}</TableCell>
              <TableCell align="right">{row.cell3}</TableCell>
              <TableCell align="right">{row.cell4}</TableCell>
              <TableCell align="right">{row.cell5}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
