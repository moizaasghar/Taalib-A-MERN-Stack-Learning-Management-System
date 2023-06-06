import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [course, setCourse] = useState([]);
  const [showCourse, setShowCourse] = useState(false);
  const [toggleButtonText, setToggleButtonText] = useState("View All Courses");

  const handleSearch = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("user"));

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
      navigate("/ManageCourses/AddCourse/CourseInfo");
    } catch (error) {
      alert("Course not found");
    }
  };

  const handleViewAll = async (e) => {
    const token = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.get(
        "http://localhost:3001/academicOfficers/getAllCourses",
        {
          headers: { token: token.token },
        }
      );
      setCourse(response.data);
      setShowCourse(!showCourse);
      setToggleButtonText(showCourse ? "View All Courses" : "Hide All Courses");
    } catch (error) {
      alert("Course not found");
    }
  };

  return (
    <div className="container">
      <br />
      <h1>View Course Details</h1>
      <h2>Search Course</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="searchString">Name</label>
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
      <button
        className="btn btn-primary"
        style={{ marginTop: "10px" }}
        onClick={handleViewAll}
      >
        {toggleButtonText}
      </button>

      {showCourse && (
        <div>
          <br />
          <h2>All Courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Instructor</th>
                <th scope="col">Credits</th>
                <th scope="col">Taught To Class</th>
              </tr>
            </thead>
            <tbody>
              {course.map((course) => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.instructor}</td>
                  <td>{course.credits}</td>
                  <td>{course.taughtToClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
