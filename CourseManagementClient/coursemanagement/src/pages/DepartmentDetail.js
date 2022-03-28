import React, {Component} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import {getDepartments} from '../reducers/DepartmentAction';
import { Link } from "react-router-dom";
import TextareaAutosize from '@mui/material/TextareaAutosize';


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

class DepartmentDetail extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        console.log(this.props.location.state)
        this.props.getDepartments(this.props.location.state);
        console.log(this.props)
        // <div>Name: 
        //            <h1>{this.props.localDept.deptName}</h1>
        //         </div>
     }

    render(){
        return (
            <div>
               {this.props.localDept && 
               <form>
                <div>
                    <h1 className='pageHeader'>Details</h1>
                    
                    <div className='center'>
                        <div style={{fontSize: "20px"}}>
                            <p>Department Name:{this.props.localDept.deptName}</p><br/>
                            <p>Address:{this.props.localDept.address}</p><br/>
                            <p>Dean:{this.props.localDept.dean}</p><br/>

                            <Link  className='center' to="/department">Back To List</Link>
                        </div>
                    </div> 
                    
                </div>
                
            <div>
            <br/><br/>
            </div>
            <h3 className='pageHeader'>Courses Of the Department</h3>
            <TableContainer className='tablePosition' component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Course Name</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Credit</StyledTableCell>
                    <StyledTableCell>Place</StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {this.props.localDept.courses.map((course) => (
                    <StyledTableRow key={course.id}>
                    <StyledTableCell style={{ fontWeight: 600 }} component="th" scope="row">{course.name}</StyledTableCell>
                    <StyledTableCell>{course.date}</StyledTableCell>
                    <StyledTableCell>{course.credit}</StyledTableCell>
                    <StyledTableCell>{course.place}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
          </form>} 

            </div>
           
        )
    }
}

const mapStateToProps= (state) => {
   return {
    localDept: state.department
    }
}
const myFuncts = {getDepartments}


export default connect(mapStateToProps, myFuncts)(DepartmentDetail);
