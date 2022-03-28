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

export default function StudentCreate() {
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

      const createStudents = () => {
        axios("https://localhost:44378/api/Students",
            {
                method: "POST", headers: { "Context-type": "application/json" },
                data: state.student
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
        history.push('/student');
    }

    const createAndRoute = () => {
        createStudents();
        setTimeout(() => {handleClick();}, 3000);

    }


    const handleDeptChange = (event, deptName) => {
        if(deptName !== null && deptName !== undefined){
            let selectedDept = deptState.depts.find(t => t.deptName === deptName);
            console.log(selectedDept)
            console.log(selectedDept.id)
            setStudent({ student: { ...state.student, deptIdFk: selectedDept.id } });
        }
        
    };

    const initialState = {
        student: {
            firstName: "",
            lastName: "",
            deptIdFk: "",
        }
    }
    const [state, setStudent] = useState(initialState);

    const handleChange = (evt) => {
        let {name, value}= evt.target;
        setStudent({student: {...state.student,[name]: value}})
    }
    return (
        <div className='center'>
            {alert && <Alert severity="success">New Student Is Successfully Created!</Alert>}
            <h1 >Create</h1>
            <br/>
            <hr></hr>
            <br/><br/>
            <Stack style = {{width: 550}} spacing={4}>
                <TextField id="filled-basic" label="First Name" name="firstName" variant="filled" onChange={handleChange}/>

                <TextField id="filled-basic" label="Last Name" name="lastName" variant="filled" onChange={handleChange}/>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={deptNames}
                    onChange={handleDeptChange}
                    renderInput={(params) => <TextField {...params} label="DepartmentName" onClick={check}/>}
                />

            </Stack>
            <br/><br/>
            <Button onClick={createAndRoute} style={{backgroundColor: "red", fontWeight: "bold"}}variant="contained" endIcon={<CreateIcon />}>
                Create
            </Button><br/><br/>
            <Link to="/student">Back To List</Link>
        </div>
    )
}
