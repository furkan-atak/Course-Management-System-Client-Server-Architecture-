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

export default class Department extends Component {
    constructor(props){
        super(props);
        this.state={departments:[]};
    }

    componentDidMount(){
        
        axios.get("https://localhost:44378/api/Departments")
             .then(response=>{
                 this.setState({departments:response.data});   
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
            <h1><i>{<Icons.FaUniversity size={78}/>}</i>Departments</h1>
            <Link to="/DepartmentCreate"> Create New Department</Link>
            </div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Department Name</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Dean</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.departments.map((department) => (
                    <StyledTableRow key={department.id}>
                    <StyledTableCell style={{ fontWeight: 600 }} component="th" scope="row">{department.deptName}</StyledTableCell>
                    <StyledTableCell>{department.address}</StyledTableCell>
                    <StyledTableCell>{department.dean}</StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/DepartmentDetail",
                            state: department.id
                        }}><Icons.FaInfoCircle color={"black"} size={28}/></Link></StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/DepartmentUpdate",
                            state: {department}
                        }}><Icons.FaEdit color={"black"} size={28}/></Link></StyledTableCell>
                    <StyledTableCell><Link to={{
                            pathname: "/DepartmentDelete",
                            state: {department}
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
