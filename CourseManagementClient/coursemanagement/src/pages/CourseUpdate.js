import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function CourseUpdate(props) {
    let theCourse = props.location.state.course
    let history = useHistory();

    const [alert, setAlert] = useState(false);

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

    const updateCourse = () => {    
        axios.put(`https://localhost:44378/api/Courses/${theCourse.id}`, state.course)
        .then(response=>{
           setAlert({alert: response.data !== null})
        }).catch(error => {
           console.log(error);
           throw error;
        });
       
    }

    const handleClick = () => {
        history.push('/CourseList');
    }

    const updateAndRoute = () => {
        updateCourse();
        setTimeout(() => {handleClick();}, 3000);

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
            id: theCourse.id,
            name: theCourse.name,
            deptIdFk: theCourse.deptIdFk,
            date: value,
            credit: theCourse.creadit,
            place: theCourse.place,
        }
    }
    const [state, setCourse] = useState(initialState);

    const handleChange = (evt) => {
        let {name, value}= evt.target;
        setCourse({course: {...state.course,[name]: value}})
    }


    return (
        <div className='center'>
            {alert && <Alert severity="success">Record Is Successfully Changed</Alert>}
            <h1 className='CourseCreate'>Update</h1>
            <br/>
            <hr></hr>
            <br/><br/>
            <Stack style = {{width: 550}} spacing={4}>
                <TextField defaultValue={theCourse.name} id="filled-basic" label="Name" name="name" variant="filled" onChange={handleChange}/>

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    defaultValue={theCourse.deptIdFkNavigation.deptName}
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
            <Button onClick={updateAndRoute} style={{backgroundColor: "turqoise", fontWeight: "bold"}}variant="contained" endIcon={<UpdateIcon />}>
                Update
            </Button>
            <br/><br/>
            <Link style={{color: "black", fontWeight: "bold"}} to="/CourseList">Back To List</Link>
        </div>
    )
}

