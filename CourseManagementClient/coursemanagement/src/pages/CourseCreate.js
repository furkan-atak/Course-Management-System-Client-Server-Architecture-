import React, {useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function CourseCreate() {
    let history = useHistory();

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const [deptState, setDepts] = useState({depts:[]});
    

    useEffect(() => {
        const fetchData = async () => {
        const result = await axios.get("https://localhost:44378/api/Departments").catch(error => {
               console.log(error);
               throw error;
           });
           setDepts({ ...deptState, depts: result.data })
        };
        fetchData();
        check();
      }, []);

    const initialDeptName = []
    const [deptNames, setDeptName] = useState(initialDeptName);
    const check = () => {
        let array = []
        for (let i = 0; i < deptState.depts.length; i++) {
            array.push(deptState.depts[i].deptName);
       }
       console.log(array)
       console.log(deptState.depts)
       if ( deptNames.length === 0){
        setDeptName(array);
       }
        
    }

    const [value, setDateValue] = useState(new Date());

    const handleDateChange = (newValue) => {
        setDateValue(newValue);
        setCourse({ course: { ...state.course, date: value } });
    };

    const handleDeptChange = (event, deptName) => {
        if(deptName !== null && deptName !== undefined){
            let selectedDept = deptState.depts.find(t => t.deptName === deptName);
            console.log(selectedDept)
            console.log(selectedDept.id)
            setCourse({ course: { ...state.course, deptIdFk: selectedDept.id } });
        }
        
    };

    
    const initialState = {
        course: {
            name: "",
            deptIdFk: 0,
            date: value,
            credit: 0,
            place: "",
        }
    }
    const [state, setCourse] = useState(initialState);

    const handleChange = (evt) => {
        let {name, value}= evt.target;
        setCourse({course: {...state.course,[name]: value}})
    }

    const createEmployee = (evt) => {
        axios("https://localhost:44378/api/Courses",
            {
                method: "POST", headers: { "Context-type": "application/json" },
                data: state.course
            })
            .then(response => {
                console.log(response.data);
                setAlertContent("");
                setAlert(true);
                setTimeout(() => {history.push("/CourseList")}, 2000);
            }).catch(error => {
                console.log(error);
                throw error;
            });
    }
    
   
    return (
        <div className='center'>
            {alert && <Alert severity="success">New Course Created</Alert>}
            <h1 className='CourseCreate'>Create Course</h1>
            <br/><br/><br/>
            
           <Stack style = {{width: 550}} spacing={4}>

            <TextField  id="filled-basic" label="Name" name="name" variant="filled" onChange={handleChange}/>

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={deptNames}
                onChange={handleDeptChange}
                renderInput={(params) => <TextField {...params} label="DepartmentName" onClick={check}/>}
            />

            <TextField id="filled-basic" name="credit" label="Credit" variant="filled"  onChange={handleChange}/>

            <LocalizationProvider dateAdapter={AdapterDateFns}>                   
                    <DateTimePicker
                    label="Date&Time"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params}/>}
                    />
            </LocalizationProvider>

            <TextField id="filled-basic" name="place" label="Place" variant="filled" onChange={handleChange}/>

          </Stack>
          <br/><br/>
          <Button onClick={createEmployee} variant="contained" endIcon={<CreateIcon />}>
            Create
          </Button><br/><br/>
          <Link style={{color:"black"}} to="/CourseList">Back To List</Link>
        </div>
    )
}
