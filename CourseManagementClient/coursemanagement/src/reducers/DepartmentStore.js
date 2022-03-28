
import { createStore,applyMiddleware } from "redux";
import DepartmentReducer from "./DepartmentReducer";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
const initalState = {

}
const middleware = [thunk]
const deptStore = createStore(DepartmentReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default deptStore;