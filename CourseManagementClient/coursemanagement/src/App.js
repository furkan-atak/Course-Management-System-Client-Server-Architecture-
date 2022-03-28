import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Student from "./pages/Student";
import Department from "./pages/Department";
import CourseList from "./pages/CourseList";
import CourseCreate from "./pages/CourseCreate";
import CourseDelete from "./pages/CourseDelete";
import CourseDetail from "./pages/CourseDetail";
import CourseUpdate from "./pages/CourseUpdate";
import Teacher from "./pages/Teacher";
import StudentUpdate from "./pages/StudentUpdate";
import StudentCreate from "./pages/StudentCreate";
import StudentDetail from "./pages/StudentDetail";
import StudentDelete from "./pages/StudentDelete";
import DepartmentCreate from "./pages/DepartmentCreate";
import DepartmentDelete from "./pages/DepartmentDelete";
import DepartmentDetail from "./pages/DepartmentDetail";
import DepartmentUpdate from "./pages/DepartmentUpdate";
import TeacherCreate from "./pages/TeacherCreate";
import TeacherDelete from "./pages/TeacherDelete";
import TeacherDetail from "./pages/TeacherDetail";
import TeacherUpdate from "./pages/TeacherUpdate";
import { Provider } from 'react-redux';
import deptStore from "./reducers/DepartmentStore";


export default function App() {
  return (
    <>
      <Provider store={deptStore}>
        <BrowserRouter>
          <Navbar/>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/course" component={Course}></Route>
              <Route path="/student" component={Student}></Route>
              <Route path="/department" component={Department}></Route>
              <Route path="/CourseList" component={CourseList}></Route>
              <Route path="/CourseCreate" component={CourseCreate}></Route>
              <Route path="/CourseDelete" component={CourseDelete}></Route>
              <Route path="/CourseDetail" component={CourseDetail}></Route>
              <Route path="/CourseUpdate" component={CourseUpdate}></Route>
              <Route path="/teacher" component={Teacher}></Route>
              <Route path="/StudentUpdate" component={StudentUpdate}></Route>
              <Route path="/StudentCreate" component={StudentCreate}></Route>
              <Route path="/StudentDetail" component={StudentDetail}></Route>
              <Route path="/StudentDelete" component={StudentDelete}></Route>
              <Route path="/DepartmentCreate" component={DepartmentCreate}></Route>
              <Route path="/DepartmentDelete" component={DepartmentDelete}></Route>
              <Route path="/DepartmentDetail" component={DepartmentDetail}></Route>
              <Route path="/DepartmentUpdate" component={DepartmentUpdate}></Route>
              <Route path="/TeacherCreate" component={TeacherCreate}></Route>
              <Route path="/TeacherDelete" component={TeacherDelete}></Route>
              <Route path="/TeacherDetail" component={TeacherDetail}></Route>
              <Route path="/TeacherUpdate" component={TeacherUpdate}></Route>

            </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

