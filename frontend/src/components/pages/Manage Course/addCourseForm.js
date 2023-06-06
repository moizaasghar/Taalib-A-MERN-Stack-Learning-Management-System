import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CourseForm() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "http://localhost:3001/academicOfficers/getAllTeachers",
          {
            headers: { token: token.token },
          }
        );
        setTeachers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTeachers();
  }, []);

  
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState(-1);
  const [taughtToClass, setTaughtToClass] = useState(-1);


  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const creditsArray = [1, 2, 3, 4];

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
      const response = await axios.post(
        "http://localhost:3001/academicOfficers/addCourse",
        course,
        {
          headers: { token: token.token },
        }
      );
      localStorage.setItem("course", JSON.stringify(response.data));
      addCourseToTeacher(response.data, instructor);
      navigate("/ManageCourses/AddCourse/CourseInfo");
    } catch (error) {
      alert(error);
    }
  };

  const addCourseToTeacher = async (course, teacherId) => {
    const teacher = teachers.find((teacher) => teacher._id === teacherId);
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      await axios.post(
        "http://localhost:3001/academicOfficers/addCourseToTeacher",
        { course, teacher },
        {
          headers: { token: token.token },
        }
      );
    } catch (error) {
      alert(error);
    }
  };


  return (
    <div className="container">
      <br />
      <h1>Register Course</h1>
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
              }
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructor">Teacher</label>
          <select
            className="form-control"
            id="instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>

        </div>
        <div className="form-group">
          <label htmlFor="credits">Credits</label>
          <select 
            className="form-control"
            id="credits"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
          >
            <option value="">Select Credits</option>
            {creditsArray.map((credit) => (
              <option key={credit} value={credit}>
                {credit}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="taughtToClass">Offered To Class</label>
          <select
            className="form-control"
            id="taughtToClass"
            value={taughtToClass}
            onChange={(e) => setTaughtToClass(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((classValue) => (
              <option key={classValue} value={classValue}>
                {classValue}
              </option>
            ))}
          </select>
        </div>        
        <button type="submit" className="btn btn-primary">
          Add Course
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
