import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

export default function StudentDetail(props) {
    let theStudent = props.location.state.student
    return (
        <form>
            <div>
                <h1 className='pageHeader'>Details</h1>
            </div>
            <TableContainer sx={{ width: 800 }} className='tablePosition' component={Paper}>
            <Table sx={{ width: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Dept Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">{theStudent.firstName}</TableCell>
                    <TableCell>{theStudent.lastName}</TableCell>
                    <TableCell>{theStudent.deptIdFkNavigation.deptName}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </form>
    )
}
