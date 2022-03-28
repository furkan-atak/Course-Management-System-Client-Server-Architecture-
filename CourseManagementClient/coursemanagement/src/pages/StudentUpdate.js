import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';

export default function StudentUpdate(props) {
    let theStudent = props.location.state.student
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

      const updateStudent = () => {    
        axios.put(`https://localhost:44378/api/Students/${theStudent.id}`, state.student)
        .then(response=>{
           setAlert({alert:  response.status === 200})
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
            id: theStudent.id,
            firstName: theStudent.firstNamename,
            lastName: theStudent.lastName,
            deptIdFk: theStudent.deptIdFk,
        }
    }
    const [state, setStudent] = useState(initialState);

    const handleChange = (evt) => {
        let {name, value}= evt.target;
        setStudent({student: {...state.student,[name]: value}})
    }
    return (
        <div className='center'>
            {alert && <Alert severity="success">Record Is Successfully Updated!</Alert>}
            <h1 >Update</h1>
            <br/>
            <hr></hr>
            <br/><br/>
            <Stack style = {{width: 550}} spacing={4}>
                <TextField defaultValue={theStudent.firstName} id="filled-basic" label="First Name" name="firstName" variant="filled" onChange={handleChange}/>

                <TextField defaultValue={theStudent.lastName} id="filled-basic" label="Last Name" name="lastName" variant="filled" onChange={handleChange}/>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    defaultValue={theStudent.deptIdFkNavigation.deptName}
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
