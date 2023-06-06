const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const { AcademicOfficer } = require('../model/AcademicOfficerModel');
const { Course } = require('../model/StudentModel');
const { Student } = require('../model/StudentModel');
const { Teacher } = require('../model/TeacherModel');
const { verifyToken } = require('../middleware/middleware');
const mongoose = require('mongoose');


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the database
    const academicOfficer = await AcademicOfficer.findOne({ email });
    if (!academicOfficer) {
      return res.status(404).json({ message: 'Invalid email' });
    }

    if (password !== academicOfficer.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // Generate a JWT token
    const token = jwt.sign(
      { id: academicOfficer._id,
        role: academicOfficer.role }, 
        process.env.TOKEN_SECRET_KEY
    );

    res.status(200).json({ token, academicOfficer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/* ------------ Manage Courses Routes (CRUD) ------------ */
// Create a new course
router.post('/addCourse', verifyToken, async(req, res) => {
  const course = new Course({
    name: req.body.name,
    instructor: req.body.instructor,
    credits: req.body.credits,
    taughtToClass: req.body.taughtToClass,
  });

  try {
    const result = await course.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all courses
router.get('/getAllCourses', verifyToken, async(req, res) => {
  try {
    const courses = await Course.find().sort('name');
    res.send(courses);
  } catch (ex) {
    res.status(500).send('Internal server error.');
  }
});

// Read a specific course by ID
router.post('/getCourse', verifyToken, async(req, res) => {
  try {
    const name = req.body.name;
    const course = await Course.findOne({name})
    if (!course) return res.status(404).send('Course not found.');
    res.send(course);
  } catch (err) {
    res.status(500).send('Internal server error.');
  }
});

// Update a specific course by ID
router.put('/updateCourse/:id', verifyToken, async(req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        instructor: req.body.instructor,
        credits: req.body.credits,
        taughtToClass: req.body.taughtToClass,
      },
      { new: true }
    );
    if (!course) return res.status(404).send('Course not found.');
    res.send(course);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

// Delete a specific course by ID
router.delete('/removeCourse/:id', verifyToken, async(req, res) => {
  try {
    
    const course = await Course.findById(req.params.id);
    const deleteCourse = await Course.findByIdAndRemove(req.params.id);
    
    if (!deleteCourse) return res.status(404).send('Course not found.');
    
    var obj = new mongoose.Types.ObjectId(course.instructor);
    
    const teacher = await Teacher.findOne({ _id: obj });
    teacher.courses.pull(course._id);
    await teacher.save();
    res.send(deleteCourse);
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
});


/* ------------ Manage Students Routes (CRUD) ------------ */

// GET all students
router.get('/getAllStudents', verifyToken, async(req, res) => {
  const students = await Student.find();
  res.send(students);
});

// GET a specific student by ID
router.post('/getStudent', verifyToken, async(req, res) => {
  const rollNumber = req.body.rollNumber;
  const student = await Student.findOne({ rollNumber });
  if (!student) return res.status(404).send('Student not found');
  res.send(student);
});

// CREATE a new student
router.post('/addStudent', verifyToken, async(req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// UPDATE a student by ID
router.put('/updateStudent/:id', verifyToken, async(req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    if (!student) {
      return res.status(404).send('The student with the given ID was not found.');
    }
    res.send(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


// DELETE a student by ID
router.delete('/removeStudent/:id', verifyToken, async(req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).send('Student not found');
  res.send(student);
});


// get all teachers
router.get('/getAllTeachers', verifyToken, async(req, res) => {
  const teachers = await Teacher.find();
  res.send(teachers);
});


router.post("/addCourseToTeacher", verifyToken, async (req, res) => {
  const teacher = await Teacher.findOne({ _id: req.body.teacher._id });
  if (!teacher) return res.status(404).send("Teacher not found");

  teacher.courses.push(req.body.course);
  
  await new Promise((resolve) => setTimeout(resolve, 10000));
  await teacher.save();
  res.send(teacher);
});
module.exports = router;

