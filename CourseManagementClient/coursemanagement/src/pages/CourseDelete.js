import React, { Component } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { fontWeight } from '@mui/system';


export default class CourseDelete extends Component {
    
    constructor(props){
        super(props);
        this.state = { IsAlertOn: false }
        this.deleteAndRoute = this.deleteAndRoute.bind(this);
    }
    
    deleteCourse = (id) => {    
        axios.delete(`https://localhost:44378/api/Courses/${id}`)
        .then(response=>{
           this.setState({IsAlertOn: response.status === 200})
        }).catch(error => {
           console.log(error);
           throw error;
        });
       
    }

    handleClick = () => {
        this.props.history.push('/CourseList');
    }

    deleteAndRoute = () => {
        let id = this.props.location.state.id;
        this.deleteCourse(id);
        setTimeout(() => {this.handleClick();}, 3000)
    }

    render() {
        return (
            <form>
                <div>
                {this.state.IsAlertOn && <Alert severity="success">Record Is Successfully Deleted</Alert>}
                    <h1 className='pageHeader'>Delete</h1>
                </div>
            <TableContainer sx={{ width: 800 }} className='tablePosition' component={Paper}>
            <Table sx={{ width: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>CourseName</TableCell>
                  <TableCell style={{color: "darkblue"}}>Date</TableCell>
                  <TableCell >Credit</TableCell>
                  <TableCell >Place</TableCell>
                  <TableCell >Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {this.props.location.state.name}
                    </TableCell>
                    <TableCell >{this.props.location.state.date}</TableCell>
                    <TableCell>{this.props.location.state.credit}</TableCell>
                    <TableCell>{this.props.location.state.place}</TableCell>
                    <TableCell >{this.props.location.state.deptIdFkNavigation.deptName}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button className='buttonPosition' style={{backgroundColor: "red", fontWeight: "bold", color: "white"}} onClick={this.deleteAndRoute} variant="basic">
                    Delete
         </Button>
         <br/><br/>
          <Link className='buttonPosition' to="/CourseList">Back To List</Link>
          </form>
        )
    }
}
