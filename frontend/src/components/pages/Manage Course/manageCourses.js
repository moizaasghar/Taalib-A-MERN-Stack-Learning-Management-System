import React from "react";
import NavBar from "../nav";
import SideBar from "../sideBar";
import "../../css/manageStudent.css";
import reglogo from "../../images/courses.png";
import editlogo from "../../images/edit.png";
import deleteLogo from "../../images/delete.png";
import viewLogo from "../../images/file.png";
import { useNavigate } from "react-router-dom";

function ManageCourse() {
    const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <div>
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-10">
            <br />
            <div className="container">
              <h1>Manage Courses</h1>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <div className="card card-custom" onClick={()=>{navigate("/Home")}}>
                    <img
                      style={{ paddingLeft: 10, paddingTop: 10, width: 100, height: 100 }}
                      src={reglogo}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Add Course</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-custom">
                    <img
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: 100,
                        height: 100,
                      }}
                      src={editlogo}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Edit Course Info</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="card card-custom">
                    <img
                      style={{ paddingTop: 10, width: 100, height: 100 }}
                      src={deleteLogo}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Remove Course</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-custom">
                    <img
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: 100,
                        height: 100,
                      }}
                      src={viewLogo}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Find a Course</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCourse;
