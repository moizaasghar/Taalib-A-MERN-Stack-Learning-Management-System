import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentForm() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getStudents = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "http://localhost:3001/academicOfficers/getAllStudents",
          {
            headers: { token: token.token },
          }
        );
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getStudents();
  }, []);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [classValue, setClassValue] = useState("");
  const [password, setPassword] = useState("");

  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const GenerateRollNumber = () => {
    let rollNumber = Math.floor(1000 + Math.random() * 9000);
    const rollNumberExists = students.find(
      (student) => student.rollNumber === rollNumber
    );
    if (rollNumberExists) {
      GenerateRollNumber();
    }
    return rollNumber;
  };

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
      const response = await axios.post(
        "http://localhost:3001/academicOfficers/addStudent",
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
      navigate("/ManageStudents/RegisterStudent/StudentInfo");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <br />
      <h1>Register Student</h1>
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
              const rollNumber = GenerateRollNumber();
              setRollNumber(rollNumber);
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
          <select
            className="form-control"
            id="class"
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((classOption) => (
              <option key={classOption} value={classOption}>
                {classOption}
              </option>
            ))}
          </select>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
