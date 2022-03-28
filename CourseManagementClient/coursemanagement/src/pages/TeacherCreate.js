import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function TeacherCreate() {
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

      const createTeacher = () => {
        axios("https://localhost:44378/api/Teachers",
            {
                method: "POST", headers: { "Context-type": "application/json" },
                data: state.teacher
            })
            .then(response =>{
                setAlert({alert: response.status === 200 })
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
    }

    const handleClick = () => {
        history.push('/teacher');
    }

    const createAndRoute = () => {
        createTeacher();
        setTimeout(() => {handleClick();}, 3000);

    }


    const handleDeptChange = (event, deptName) => {
        if(deptName !== null && deptName !== undefined){
            let selectedDept = deptState.depts.find(t => t.deptName === deptName);
            console.log(selectedDept)
            console.log(selectedDept.id)
            setTeacher({ teacher: { ...state.teacher, deptId: selectedDept.id } });
        }
        
    };

    const initialState = {
        teacher: {
            name: "",
            deptId: "",
            title: "",
        }
    }
    const [state, setTeacher] = useState(initialState);

    const handleChange = (evt) => {
        let {name, value}= evt.target;
        setTeacher({teacher: {...state.teacher,[name]: value}})
    }
    return (
        <div className='center'>
            {alert && <Alert severity="success">New Teacher Is Successfully Created!</Alert>}
            <h1 >Create</h1>
            <br/>
            <hr></hr>
            <br/><br/>
            <Stack style = {{width: 550}} spacing={4}>
                <TextField id="filled-basic" label="Name" name="name" variant="filled" onChange={handleChange}/>

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={deptNames}
                    onChange={handleDeptChange}
                    renderInput={(params) => <TextField {...params} label="DepartmentName" onClick={check}/>}
                />

                <TextField id="filled-basic" label="Name" name="title" variant="filled" onChange={handleChange}/>

            </Stack>
            <br/><br/>
            <Button onClick={createAndRoute} style={{backgroundColor: "red", fontWeight: "bold"}}variant="contained" endIcon={<CreateIcon />}>
            Create
            </Button>
        </div>
    )
}
