import React from "react";

function Profile() {
  const user1 = JSON.parse(localStorage.getItem("user"));
  if (!user1) {
    window.location.href = "/";
  }
  const user = user1.academicOfficer;
  return (
    <div>
      <div className="container">
        <br />
        <h1>My Profile</h1>
        <br />
        <table className="table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Employee Id</th>
              <td>{user._id}</td>
            </tr>
            <tr>
              <th>Designation</th>
              <td>Academic Officer</td>
            </tr>
            <tr>
              <th>Joined On</th>
              <td>{user.joiningDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
