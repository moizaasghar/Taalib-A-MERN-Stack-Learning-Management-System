const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const academicOfficerRoutes = require("./route/academicOfficerRoutes");

const app = express();
app.use(express.json());
app.use(cors());


// connect to db
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

  // Start the server
app.listen(3001, () => {
    console.log('Server started');
  });

  
  // middleware
app.use(express.json());

// Mount routes
app.use('/academicOfficers', academicOfficerRoutes);
