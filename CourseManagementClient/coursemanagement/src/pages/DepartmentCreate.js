import React, {useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function DepartmentCreate() {
    let history = useHistory();

    const [alert, setAlert] = useState(false);

    const createDepartments = () => {
        axios("https://localhost:44378/api/Departments",
            {
                method: "POST", headers: { "Context-type": "application/json" },
                data: state.dept
            })
            .then(response => {
                setAlert({alert: response.data !== null})
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
    }

    const handleClick = () => {
        history.push('/department');
    }

    const createAndRoute = () => {
        console.log(state.dept)
        createDepartments();
        setTimeout(() => {handleClick();}, 3000);

    }
    const initialState = {
        dept: {
            deptName: 0,
            address: "",
            dean: "",
        }
    }
    const [state, setDepartment] = useState(initialState);

    const handleChange = (evt) => {
        let {name, value}= evt.target;
        setDepartment({dept: {...state.dept,[name]: value}})
    }
    return (
        <div className='center'>
            {alert && <Alert severity="success">New Department Is Successfully Created!</Alert>}
            <h1 className='CourseCreate'>Create</h1>
            <br/><br/><br/>
           <Stack style = {{width: 550}} spacing={4}>

            <TextField  id="filled-basic" label="Name" name="deptName" variant="filled" onChange={handleChange}/>

            <TextField id="filled-basic" name="address" label="Address" variant="filled" onChange={handleChange}/>

            <TextField id="filled-basic" name="dean" label="Dean" variant="filled" onChange={handleChange}/>

          </Stack>
          <br/><br/>
          <Button onClick={createAndRoute} variant="contained" endIcon={<CreateIcon />}>
            Create
          </Button><br/><br/>
          <Link to="/department">Back To List</Link>
        </div>
    )
}
