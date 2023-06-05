import React from "react";
import NavBar from "../nav";
import SideBar from "../sideBar";

function StudentInfo() {
  const student = JSON.parse(localStorage.getItem("student"));
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
              <h1>Student Information</h1>
              <br />
              <h1>{student.name}</h1>
              <br />
              <table className="table">
                <tbody>
                  <tr>
                    <th>Roll Number</th>
                    <td>{student.rollNumber}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{student.email}</td>
                  </tr>
                  <tr>
                    <th>Password</th>
                    <td>{student.password}</td>
                  </tr>
                  <tr>
                    <th>Class</th>
                    <td>{student.class}</td>
                  </tr>
                  <tr>
                    <th>Registration Date</th>
                    <td>{student.registrationDate}</td>
                  </tr>
                  <tr>
                    <th>Fee Status</th>
                    <td>{student.isFeePaid ? "Paid" : "Not Paid"}</td>
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

export default StudentInfo;
