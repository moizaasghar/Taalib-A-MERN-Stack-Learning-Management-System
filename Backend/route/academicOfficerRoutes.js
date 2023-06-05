const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const { AcademicOfficer } = require('../model/AcademicOfficerModel');
const { Course } = require('../model/StudentModel');
const { Student } = require('../model/StudentModel');
const { verifyToken } = require('../middleware/middleware');


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
  } catch (ex) {
    res.status(400).send(ex.message);
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
router.get('/getCourse/:id', verifyToken, async(req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found.');
    res.send(course);
  } catch (ex) {
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
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) return res.status(404).send('Course not found.');
    res.send(course);
  } catch (ex) {
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


module.exports = router;

