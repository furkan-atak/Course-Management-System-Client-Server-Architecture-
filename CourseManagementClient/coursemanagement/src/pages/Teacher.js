import React, { Component } from 'react'
import axios from 'axios';
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

export default class Teacher extends Component {
    constructor(props){
        super(props);
        this.state={teachers:[]};
    }

    componentDidMount(){
        
        axios.get("https://localhost:44378/api/teachers")
             .then(response=>{
                 this.setState({teachers:response.data});   
             }).catch(error => {
                console.log(error);
                throw error;
            });          
     }

    render() {
        return (
            <form>
                <div>
                    <br/><br/>
                    <h1><i>{<Icons.FaChalkboardTeacher size={78}/>}</i>Teachers</h1>
                    <Link to="/TeacherCreate"> Create New Teacher</Link>
                </div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Department</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.teachers.map((teacher) => (
                    <StyledTableRow key={teacher.id}>
                    <StyledTableCell style={{ fontWeight: 600 }} component="th" scope="row">{teacher.name}</StyledTableCell>
                    <StyledTableCell>{teacher.title}</StyledTableCell>
                    <StyledTableCell>{teacher.dept.deptName}</StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/TeacherDetail",
                            state: {teacher}
                        }}><Icons.FaInfoCircle color={"black"} size={28}/></Link></StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/TeacherUpdate",
                            state: {teacher}
                        }}><Icons.FaEdit color={"black"} size={28}/></Link></StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/TeacherDelete",
                            state: {teacher}
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
