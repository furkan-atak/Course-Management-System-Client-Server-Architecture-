import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function TeacherDelete(props) {
    let theTeacher = props.location.state.teacher
    let history = useHistory();
    const [alert, setAlert] = useState(false);

    const deleteTeacher = () => {    
        axios.delete(`https://localhost:44378/api/Teachers/${theTeacher.id}`)
        .then(response=>{
           setAlert({alert: response.status === 200 })
        }).catch(error => {
           console.log(error);
           throw error;
        });
       
    }

    const handleClick = () => {
        history.push('/teacher');
    }

    const deleteAndRoute = () => {
        deleteTeacher();
        setTimeout(() => {handleClick();}, 3000)
    }

    return (
        <form>
            <div>
            {alert && <Alert severity="success">Record Is Successfully Deleted!</Alert>}
                <h1 className='pageHeader'>Delete</h1>
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
                    <TableCell component="th" scope="row">{theTeacher.name}</TableCell>
                    <TableCell>{theTeacher.title}</TableCell>
                    <TableCell>{theTeacher.dept.deptName}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={deleteAndRoute} style={{backgroundColor: "red", fontWeight: "bold"}}variant="contained">
                Update
            </Button>
          </form>
    )
}
