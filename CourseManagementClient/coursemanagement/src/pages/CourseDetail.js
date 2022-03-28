import axios from 'axios';
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as Icons from "react-icons/fa";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: "bold",
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default class CourseDetail extends Component{
    constructor(props){
        super(props);
        console.log(props)
    }
    render (){
        return (    
            <form>
                <div>
                    <h1 className='pageHeader'>Details</h1>
                    
                    <div className='center'>
                        <text style={{fontSize: "18px"}}>
                            <p>CourseName:{this.props.location.state.name}</p><br/>
                            <p>Date:{this.props.location.state.date}</p><br/>
                            <p>Credit:{this.props.location.state.credit}</p><br/>
                            <p>Place:{this.props.location.state.place}</p><br/>
                            <p>Department:{this.props.location.state.deptIdFkNavigation.deptName}</p><br/>
                            <p>Number Of Students:{this.props.location.state.takes.length}</p><br/>
                            <Link  className='center' to="/CourseList">Back To List</Link>
                        </text>
                    </div> 
                    
                </div>
                
            <div>
            <br/><br/>
            </div>
            <h3 className='pageHeader'>Students Of the Course</h3>
            <TableContainer className='tablePosition' component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>First Name</StyledTableCell>
                    <StyledTableCell>Last Name</StyledTableCell>
                    <StyledTableCell>Department</StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {this.props.location.state.takes.map((student) => (
                    <StyledTableRow key={student.studentIdFkNavigation.id}>
                    <StyledTableCell style={{ fontWeight: 600 }} component="th" scope="row">{student.studentIdFkNavigation.firstName}</StyledTableCell>
                    <StyledTableCell>{student.studentIdFkNavigation.lastName}</StyledTableCell>
                    <StyledTableCell>{student.studentIdFkNavigation.deptIdFkNavigation.deptName}</StyledTableCell>

                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
          </form>
        )
    }
}
