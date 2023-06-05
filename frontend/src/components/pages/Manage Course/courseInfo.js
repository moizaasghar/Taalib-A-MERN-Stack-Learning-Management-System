import React from "react";
import NavBar from "../nav";
import SideBar from "../sideBar";

function CourseInfo() {
  const Course = JSON.parse(localStorage.getItem("course"));
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
              <h1>{Course.name}</h1>
              <br />
              <table className="table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{Course.name}</td>
                  </tr>
                  <tr>
                    <th>Instructor</th>
                    <td>{Course.instructor}</td>
                  </tr>
                  <tr>
                    <th>Credits</th>
                    <td>{Course.credits}</td>
                  </tr>
                  <tr>
                    <th>Offered To Class</th>
                    <td>{Course.taughtToClass}</td>
                  </tr>
                  <tr>
                    <th>Registration Date</th>
                    <td>{Course.registrationDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
