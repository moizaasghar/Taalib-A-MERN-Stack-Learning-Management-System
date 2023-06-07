import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

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

      localStorage.setItem("student", JSON.stringify(response.data));
      navigate("/ManageStudents/ViewStudent/SearchResult");
    } catch (error) {
      alert("Student not found");
    }
  };

  return (
    <div className="container">
      <br />
      <h1>View Student Details</h1>
      <h2>Search Student</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="name">Roll Number</label>
          <input
            type="number"
            className="form-control"
            id="rollNumber"
            value={searchString}
            min={1}
            onChange={(e) => setSearchString(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
