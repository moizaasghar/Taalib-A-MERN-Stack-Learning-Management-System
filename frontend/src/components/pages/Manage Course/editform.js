import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditForm() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState(-1);
  const [taughtToClass, setTaughtToClass] = useState(-1);
  const [registartionDate, setRegistartionDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = {
      name,
      instructor,
      credits,
      taughtToClass,
    };

    try {
      const token = JSON.parse(localStorage.getItem("user"));
      const response = await axios.put(
        `http://localhost:3001/academicOfficers/updateCourse/${searchString}`,
        course,
        {
          headers: { token: token.token },
        }
      );

      localStorage.setItem("course", JSON.stringify(response.data));
      setName("");
      setInstructor("");
      setCredits(-1);
      setTaughtToClass(-1);
      navigate("/ManageCourses/EditCourse/CourseInfo");
    } catch (error) {
      alert(error);
    }
  };

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
      setSearchString(response.data._id);
      setName(response.data.name);
      setInstructor(response.data.instructor);
      setCredits(response.data.credits);
      setTaughtToClass(response.data.taughtToClass);
      setRegistartionDate(response.data.registartionDate);
      setShowForm(true);
    } catch (error) {
      alert("Student not found");
    }
  };

  return (
    <div className="container">
      <br />
      <h1>Edit Course</h1>
      <h2>Search Course</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
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
            <label htmlFor="rollNumber">Instructor</label>
            <input
              type="text"
              className="form-control"
              id="instructor"
              value={instructor}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="credits">Credits</label>
            <input
              type="number"
              className="form-control"
              id="credits"
              value={credits}
              min={1}
              max={4}
              onChange={(e) => setCredits(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class</label>
            <input
              type="number"
              className="form-control"
              id="taughtToClass"
              value={taughtToClass}
              min={1}
              max={10}
              onChange={(e) => setTaughtToClass(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">registartion Date</label>
            <input
              type="date"
              className="form-control"
              id="registartionDate"
              value={registartionDate}
              onChange={(e) => setRegistartionDate(e.target.value)}
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

export default EditForm;
