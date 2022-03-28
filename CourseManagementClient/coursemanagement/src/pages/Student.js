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


export default class Student extends Component {
    constructor(props){
        super(props);
        this.state={students:[]};
    }

    componentDidMount(){
        
        axios.get("https://localhost:44378/api/Students")
             .then(response=>{
                 this.setState({students:response.data});   
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
                <h1 ><i>{<Icons.FaUserGraduate size={78}/>}</i>Students</h1>
                    <Link to="/StudentCreate"> Create New Student</Link>
                </div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>First Name</StyledTableCell>
                    <StyledTableCell>Last Name</StyledTableCell>
                    <StyledTableCell>Department</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.students.map((student) => (
                    <StyledTableRow key={student.id}>
                    <StyledTableCell style={{ fontWeight: 600 }} component="th" scope="row">{student.firstName}</StyledTableCell>
                    <StyledTableCell>{student.lastName}</StyledTableCell>
                    <StyledTableCell>{student.deptIdFkNavigation.deptName}</StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/StudentDetail",
                            state: {student}
                        }}><Icons.FaInfoCircle color={"black"} size={28}/></Link></StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/StudentUpdate",
                            state: {student}
                        }}><Icons.FaEdit color={"black"} size={28}/></Link></StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/StudentDelete",
                            state: {student}
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
