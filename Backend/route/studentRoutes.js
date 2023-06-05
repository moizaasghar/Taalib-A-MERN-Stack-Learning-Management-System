// const express = require('express');
// const { Student } = require('../Models/StudentModel');
// const router = express.Router();

// // GET all students
// router.get('/getAllStudents', async (req, res) => {
//   const students = await Student.find();
//   res.send(students);
// });

// // GET a specific student by ID
// router.get('/getStudent/:id', async (req, res) => {
//   const student = await Student.findById(req.params.id);
//   if (!student) return res.status(404).send('Student not found');
//   res.send(student);
// });

// // CREATE a new student
// router.post('/addStudent', async (req, res) => {
//   const student = new Student(req.body);
//   try {
//     await student.save();
//     res.send(student);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // UPDATE a student by ID
// router.put('/updateStudent/:id', async (req, res) => {
//   try {
//     const student = await Student.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body
//       },
//       { new: true }
//     );
//     if (!student) {
//       return res.status(404).send('The student with the given ID was not found.');
//     }
//     res.send(student);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });


// // DELETE a student by ID
// router.delete('/removeStudent/:id', async (req, res) => {
//   const student = await Student.findByIdAndRemove(req.params.id);
//   if (!student) return res.status(404).send('Student not found');
//   res.send(student);
// });

module.exports = router;
