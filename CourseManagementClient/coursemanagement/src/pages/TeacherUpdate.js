import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function TeacherUpdate(props) {
    let theTeacher = props.location.state.teacher
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

      const updateTeacher = () => {    
        axios.put(`https://localhost:44378/api/Teachers/${theTeacher.id}`, state.teacher)
        .then(response=>{
           setAlert({alert: response.status === 200 });
        }).catch(error => {
           console.log(error);
           throw error;
        });
       
    }

    const handleClick = () => {
        history.push('/teacher');
    }

    const updateAndRoute = () => {
        updateTeacher();
        setTimeout(() => {handleClick();}, 3000);

    }


    const handleDeptChange = (event, deptName) => {
        if(deptName !== null && deptName !== undefined){
            let selectedDept = deptState.depts.find(t => t.deptName === deptName);
            console.log(selectedDept)
            console.log(selectedDept.id)
            setteacher({ teacher: { ...state.teacher, deptIdFk: selectedDept.id } });
        }
        
    };

    const initialState = {
        teacher: {
            id: theTeacher.id,
            name: theTeacher.name,
            title: theTeacher.title,
            deptId: theTeacher.deptId,
        }
    }
    const [state, setteacher] = useState(initialState);

    const handleChange = (evt) => {
        let {name, value}= evt.target;
        setteacher({teacher: {...state.teacher,[name]: value}})
    }
    return (
        <div className='center'>
            {alert && <Alert severity="success">Record Is Successfully Updated!</Alert>}
            <h1 >Update</h1>
            <br/>
            <hr></hr>
            <br/><br/>
            <Stack style = {{width: 550}} spacing={4}>
                <TextField defaultValue={theTeacher.name} id="filled-basic" label="First Name" name="name" variant="filled" onChange={handleChange}/>

                <TextField defaultValue={theTeacher.title} id="filled-basic" label="Last Name" name="title" variant="filled" onChange={handleChange}/>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    defaultValue={theTeacher.dept.deptName}
                    options={deptNames}
                    onChange={handleDeptChange}
                    renderInput={(params) => <TextField {...params} label="DepartmentName" onClick={check}/>}
                />

            </Stack>
            <br/><br/>
            <Button onClick={updateAndRoute} style={{backgroundColor: "red", fontWeight: "bold"}}variant="contained" endIcon={<UpdateIcon />}>
                Update
            </Button>
        </div>
    )
}
