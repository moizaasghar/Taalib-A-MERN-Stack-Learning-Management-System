import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/pages/login";
import Home from "./components/pages/home";
import ManageStudent from "./components/pages/Manage Student/manageStudents";
import ManageCourse from "./components/pages/Manage Course/manageCourses";
import RegisterStudentForm from "./components/pages/Manage Student/registerstudent";
import StudentInfo from "./components/pages/Manage Student/studentInfo";
import EditStudent from "./components/pages/Manage Student/editStudent";
import ViewStudent from "./components/pages/Manage Student/viewStudent";
import DeleteStudent from "./components/pages/Manage Student/deleteStudent";
import StudentDelete from "./components/pages/Manage Student/delete";
import AddCourse from "./components/pages/Manage Course/addCourse";
import CourseInfo from "./components/pages/Manage Course/courseInfo";
import ViewCourse from "./components/pages/Manage Course/viewCourse";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ManageStudents" element={<ManageStudent />} />

        <Route path="/ManageStudents/ViewStudent" element={<ViewStudent />} />
        <Route
          path="/ManageStudents/ViewStudent/SearchResult"
          element={<StudentInfo />}
        />

        <Route path="/ManageStudents/EditStudent" element={<EditStudent />} />

        <Route
          path="/ManageStudents/EditStudent/StudentInfo"
          element={<StudentInfo />}
        />

        <Route
          path="/ManageStudents/RegisterStudent"
          element={<RegisterStudentForm />}
        />
        <Route
          path="/ManageStudents/RegisterStudent/StudentInfo"
          element={<StudentInfo />}
        />
        <Route path="/ManageStudents/DeleteStudent" element={<DeleteStudent />} />
        <Route path="/ManageStudents/DeleteStudent/StudentInfo" element={<StudentDelete />} />
        
        <Route path="/ManageCourses" element={<ManageCourse />} />
        <Route path="/ManageCourses/AddCourse" element={<AddCourse />} />
        <Route path="/ManageCourses/AddCourse/CourseInfo" element={<CourseInfo />} />
        <Route path="/ManageCourses/ViewCourse" element={<ViewCourse />} />
        <Route path="/ManageCourses/ViewCourse/CourseInfo" element={<CourseInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
