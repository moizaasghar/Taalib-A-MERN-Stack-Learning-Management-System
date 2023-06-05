import React from "react";
import NavBar from "../nav";
import SideBar from "../sideBar";
import DeleteForm from "./deleteform";

function DeleteStudent() {
  return (
    <div>
      <NavBar />
      <div>
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-8">
            <DeleteForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteStudent;
