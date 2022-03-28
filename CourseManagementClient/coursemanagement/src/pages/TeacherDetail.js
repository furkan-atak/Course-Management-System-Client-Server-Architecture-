import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import { Link } from "react-router-dom";

export default function TeacherDetail(props) {
    let theTeacher = props.location.state.teacher
    return (
        <form>
            <div>
                <h1 className='pageHeader'>Details</h1>
            </div>
            <TableContainer sx={{ width: 800 }} className='tablePosition' component={Paper}>
            <Table sx={{ width: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">{theTeacher.name}</TableCell>
                    <TableCell>{theTeacher.title}</TableCell>
                    <TableCell>{theTeacher.dept.deptName}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </form>
    )
}
