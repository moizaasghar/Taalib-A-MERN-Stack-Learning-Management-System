// const express = require('express');
// const router = express.Router();
// const { Course } = require('../Models/StudentModel');

// // Create a new course
// router.post('/addCourse', async (req, res) => {
//   const course = new Course({
//     name: req.body.name,
//     instructor: req.body.instructor,
//     credits: req.body.credits,
//     taughtToClass: req.body.taughtToClass,
//   });

//   try {
//     const result = await course.save();
//     res.send(result);
//   } catch (ex) {
//     res.status(400).send(ex.message);
//   }
// });

// // Read all courses
// router.get('/getALLCourses', async (req, res) => {
//   try {
//     const courses = await Course.find().sort('name');
//     res.send(courses);
//   } catch (ex) {
//     res.status(500).send('Internal server error.');
//   }
// });

// // Read a specific course by ID
// router.get('/getCourse:id', async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).send('Course not found.');
//     res.send(course);
//   } catch (ex) {
//     res.status(500).send('Internal server error.');
//   }
// });

// // Update a specific course by ID
// router.put('/updateCourse:id', async (req, res) => {
//   try {
//     const course = await Course.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         instructor: req.body.instructor,
//         credits: req.body.credits,
//         taughtToClass: req.body.taughtToClass,
//       },
//       { new: true }
//     );
//     if (!course) return res.status(404).send('Course not found.');
//     res.send(course);
//   } catch (ex) {
//     res.status(400).send(ex.message);
//   }
// });

// // Delete a specific course by ID
// router.delete('/removeCourse:id', async (req, res) => {
//   try {
//     const course = await Course.findByIdAndRemove(req.params.id);
//     if (!course) return res.status(404).send('Course not found.');
//     res.send(course);
//   } catch (ex) {
//     res.status(500).send('Internal server error.');
//   }
// });

// module.exports = router;
