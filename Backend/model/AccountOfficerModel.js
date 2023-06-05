const mongoose = require('mongoose');


const AccountOfficerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
    },
  role: {
    type: String,
    default: "AccountOfficer",
    required: true
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
});

const AccountOfficer = mongoose.model('AccountOfficer', AccountOfficerSchema);
module.exports = AccountOfficer;
