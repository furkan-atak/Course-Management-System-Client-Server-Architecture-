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

export default class CourseList extends Component  {
    constructor(props){
        super(props);
        this.state={courses:[]};
    }
    
    componentDidMount(){
        
        axios.get("https://localhost:44378/api/Courses")
             .then(response=>{
                 this.setState({courses:response.data});   
             }).catch(error => {
                console.log(error);
                throw error;
            });          
     }

    render () {
    return (
        <form>
            <br/><br/>
        <h1 ><i>{<Icons.FaBookOpen size={78}/>}</i>Courses</h1>
        <TableContainer component={Paper}>
            <Table  sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Course Name</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Credit</StyledTableCell>
                    <StyledTableCell align="right">Place</StyledTableCell>
                    <StyledTableCell align="right">Department</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.courses.map((course) => (
                    <StyledTableRow key={course.id}>
                    <StyledTableCell style={{ fontWeight: 600 }} component="th" scope="row">
                        {course.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{course.date}</StyledTableCell>
                    <StyledTableCell align="right">{course.credit}</StyledTableCell>
                    <StyledTableCell align="right">{course.place}</StyledTableCell>
                    <StyledTableCell align="right">{course.deptIdFkNavigation.deptName}</StyledTableCell>
                    <StyledTableCell align="right"><Link to={{
                            pathname: "/CourseDetail",
                            state: course
                        }}><Icons.FaInfoCircle color={"black"} size={28}/></Link></StyledTableCell>
                    <StyledTableCell align="right"><Link to={{
                            pathname: "/CourseUpdate",
                            state: {course}
                        }}><Icons.FaEdit color={"black"} size={28}/></Link></StyledTableCell>
                    <StyledTableCell align="right"><Link to={{
                            pathname: "/CourseDelete",
                            state: course
                        }}><Icons.FaTrash color={"black"} size={28}/></Link></StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </form>
    )
   }
}
