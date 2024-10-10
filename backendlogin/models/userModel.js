const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please Provide a Unique Username"],
    unique: [true, "Username Exists"],
  },
  email: {
    type: String,
    require: [true, "Please Provide a Valid Email"],
    unique: [true, "Email exists"],
  },
  password: {
    type: String,
    require: [true, "Please Provide a Password"],
    unique: false,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
