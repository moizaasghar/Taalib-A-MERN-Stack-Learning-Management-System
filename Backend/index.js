const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const studentRoutes = require("./route/studentRoutes");
// const courseRoutes = require("./route/courseRoutes");
const academicOfficerRoutes = require("./route/academicOfficerRoutes");

const app = express();

// connect to db
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

  // Start the server
app.listen(3001, () => {
    console.log('Server started on port 3001');
  });

  
  // middleware
app.use(express.json());

// Mount routes
app.use('/academicOfficers', academicOfficerRoutes);
