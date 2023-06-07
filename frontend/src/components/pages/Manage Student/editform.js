import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentForm() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [classValue, setClassValue] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = {
      name,
      rollNumber,
      email,
      class: classValue,
      password,
    };

    try {
      const token = JSON.parse(localStorage.getItem("user"));
      const response = await axios.put(
        `http://localhost:3001/academicOfficers/updateStudent/${searchString}`,
        student,
        {
          headers: { token: token.token },
        }
      );

      localStorage.setItem("student", JSON.stringify(response.data));
      setName("");
      setRollNumber("");
      setEmail("");
      setClassValue("");
      setPassword("");
      navigate("/ManageStudents/EditStudent/StudentInfo");
    } catch (error) {
      alert(error);
    }
  };

  const handleSearch = async (e) => {
    const token = JSON.parse(localStorage.getItem("user"));
    e.preventDefault();

    const data = {
      rollNumber: Number(searchString),
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/academicOfficers/getStudent",
        data,
        {
          headers: { token: token.token },
        }
      );
      setSearchString(response.data._id);
      setName(response.data.name);
      setRollNumber(response.data.rollNumber);
      setEmail(response.data.email);
      setClassValue(response.data.class);
      setPassword(response.data.password);
      setShowForm(true);
    } catch (error) {
      alert("Student not found");
    }
  };

  return (
    <div className="container">
      <br />
      <h1>Edit Student</h1>
      <h2>Search Student</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="name">Roll Number</label>
          <input
            type="number"
            className="form-control"
            id="rollNumber"
            min={1}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              type="text"
              className="form-control"
              id="rollNumber"
              value={rollNumber}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class</label>
            <input
              type="number"
              className="form-control"
              id="class"
              min={1}
              max={10}
              value={classValue}
              onChange={(e) => setClassValue(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default StudentForm;
