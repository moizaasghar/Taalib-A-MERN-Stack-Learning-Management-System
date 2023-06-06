import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteForm() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const handleSearch = async (e) => {
    const token = JSON.parse(localStorage.getItem("user"));
    e.preventDefault();

    const data = {
      name: searchString,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/academicOfficers/getCourse",
        data,
        {
          headers: { token: token.token },
        }
      );
      localStorage.setItem("course", JSON.stringify(response.data));
      navigate("/ManageCourses/DeleteCourse/CourseInfo");
    } catch (error) {
      alert("Course not found");
    }
  };

  return (
    <div className="container">
      <br />
      <h1>Remove Course</h1>
      <h2>Search Course</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="searchString"
            value={searchString}
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

export default DeleteForm;
