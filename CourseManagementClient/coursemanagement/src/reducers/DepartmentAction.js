import axios from 'axios'

export const getDepartments = (id) => async dispatch => {

    try {
        
        const res = await axios.get(`https://localhost:44378/api/Departments/${id}`)
        console.log(res.data);
        dispatch({
            type: "LIST",
            payload: res.data
        })
    }
    catch (e) {
        console.log("error")
    }

}