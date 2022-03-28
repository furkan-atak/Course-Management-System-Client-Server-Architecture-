
const initialState = {department: {}};

const DepartmentReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LIST':
            return {

                ...state,
                department: action.payload

            }
        default: return state
    }

    return state;
}

export default DepartmentReducer;