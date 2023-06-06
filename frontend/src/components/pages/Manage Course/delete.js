import React from "react";
import NavBar from "../nav";
import SideBar from "../sideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CourseDelete() {
  const navigate = useNavigate();
  const course = JSON.parse(localStorage.getItem("course"));
  
  const handleDelete = () => {
     const token = JSON.parse(localStorage.getItem("user"));
    axios
      .delete(
        `http://localhost:3001/academicOfficers/removeCourse/${course._id}`,
        {
          headers: { token: token.token },
        }
      )
      .then((response) => {

        alert("Course Deleted");
        navigate("/ManageCourses");
      })
      .catch((err) => {
        alert("Error Deleting Course");
      });
    };
    
  return (
    <div>
      <NavBar />
      <div>
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-10">
            <div className="container">
              <br />
              <h1>Course Information</h1>
              <br />
              <h1>{course.name}</h1>
              <br />
              <table className="table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{course.name}</td>
                  </tr>
                  <tr>
                    <th>Instructor</th>
                    <td>{course.instructor}</td>
                  </tr>
                  <tr>
                    <th>Credits</th>
                    <td>{course.credits}</td>
                  </tr>
                  <tr>
                    <th>Offered To Class</th>
                    <td>{course.taughtToClass}</td>
                  </tr>
                  <tr>
                    <th>Registration Date</th>
                    <td>{course.registrationDate}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDelete;
