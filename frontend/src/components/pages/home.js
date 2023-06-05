import React from "react";
import NavBar from "./nav";
import SideBar from "./sideBar";
import Profile from "./Profile/profile";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <NavBar />
      <div>
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-10">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
