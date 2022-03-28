import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function DepartmentUpdate(props) {
    let theDept = props.location.state.department 
    let history = useHistory();
    const [alert, setAlert] = useState(false);
    
    const updateStudent = () => {    
        axios.put(`https://localhost:44378/api/Departments/${theDept.id}`, state.dept)
        .then(response=>{
           setAlert({alert: response.status === 200})
        }).catch(error => {
           console.log(error);
           throw error;
        });
       
    }

    const handleClick = () => {
        history.push('/student');
    }

    const updateAndRoute = () => {
        updateStudent();
        setTimeout(() => {handleClick();}, 3000);

    }


    const initialState = {
        dept: {
            id: theDept.id,
            deptName: theDept.deptName,
            address: theDept.address,
            dean: theDept.dean,
        }
    }
    const [state, setDept] = useState(initialState);

    const handleChange = (evt) => {
        let {name, value}= evt.target;
        setDept({dept: {...state.dept,[name]: value}})
    }
    return (
        <div className='center'>
            {alert && <Alert severity="success">Record Is Successfully Updated!</Alert>}
            <h1 >Update</h1>
            <br/>
            <hr></hr>
            <br/><br/>
            <Stack style = {{width: 550}} spacing={4}>
                <TextField defaultValue={theDept.deptName} id="filled-basic" label="DepartmentName" name="deptName" variant="filled" onChange={handleChange}/>

                <TextField defaultValue={theDept.address} id="filled-basic" label="Address" name="address" variant="filled" onChange={handleChange}/>

                <TextField defaultValue={theDept.dean} id="filled-basic" label="Dean" name="dean" variant="filled" onChange={handleChange}/>

            </Stack>
            <br/><br/>
            <Button onClick={updateAndRoute} style={{backgroundColor: "red", fontWeight: "bold"}}variant="contained" endIcon={<UpdateIcon />}>
                Update
            </Button> <br/><br/>
            <Link to="/department">Back To List</Link>
        </div>
    )
}
