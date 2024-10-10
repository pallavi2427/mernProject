const UserSchema = require("./../models/userModel");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "..", "assets");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const postData = async (req, res) => {
  const { username, email, password } = req.body;
  const image = req.files && req.files.image ? req.files.image : null;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  } else {
    const existEmail = await UserSchema.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existEmail) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists." });
    } else {
      try {
        const hashedPass = await bcrypt.hash(password, 10);
        if (image) {
          await image.mv(path.join(filePath, image.name));
        }
        const data = new UserSchema({
          username: username,
          email: email,
          password: hashedPass,
          image: image ? image.name : "",
        });
        const newUser = await data.save();
        res.status(201).json({ message: "Data Save Successfully", newUser });
      } catch (err) {
        res.status(400).json({ message: "Failed" });
      }
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please fill in all fields." });
  } else {
    const user = await UserSchema.findOne({ username: username });
    if (!user) {
      res.status(400).json({ message: "Invalid username" });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid password" });
      } else {
        const token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.SECRETKEY,
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          message: "Login Successfully",
          user: username,
          token,
        });
      }
    }
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserSchema.findOne({ _id: id }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "Data Get Successfully", user });
    }
  } catch (err) {
    res.status(400).json({ message: "Failed" });
  }
};

const getUserByToken = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await UserSchema.findOne({ _id: id }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "Data Get Successfully", user });
    }
  } catch (err) {
    res.status(400).json({ message: "Failed", err });
  }
};

// const updateProfile = async (req, res) => {
//   const id = req.params.id;
//   const { username, email } = req.body;
//   try {
//     const user = await UserSchema.updateOne(
//       { _id: id },
//       { $set: { username: username, email: email } }
//     );
//     res.status(200).json({ message: "Data Updata Successfully", user });
//   } catch (error) {
//     res.status(400).json({ message: "Failed" });
//   }
// };

const updateProfile = async (req, res) => {
  const { id } = req.user;
  const { firstName, lastName, contact, email, address } = req.body;
  const image = req.files && req.files.image ? req.files.image : null;

  try {
    if (image) {
      await image.mv(path.join(filePath, image.name));
    }
    await UserSchema.updateOne(
      { _id: id },
      {
        $set: {
          firstName,
          lastName,
          contact,
          address,
          image: image ? image.name : undefined,
        },
      }
    );
    res.status(200).json({ message: "Data Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Update Failed", error: error.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "pallavi.sisodiya9009@gmail.com",
    pass: "ilkffioekvvwngaa",
  },
});

const otpGenerate = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please Enter Email" });
  }
  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const otp = otpGenerate();

  await UserSchema.findOneAndUpdate(
    { email },
    {
      $set: {
        otp: otp,
        otpExpiry: Date.now() + 15 * 60 * 1000, // OTP expires in 15 minutes
      },
    }
  );

  const mailOptions = {
    from: "pallavi.sisodiya9009@gmail.com",
    to: user.email,
    subject: "Password recovery otp",
    text: `Your OTP for password recovery is ${otp}. It valid for 15 min`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error sending Otp Email", error });
    }
    res.status(200).json({ message: "OTP send to Email" });
  });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  const currentTime = Date.now();
  if (currentTime > user.otpExpiry) {
    return res.status(400).json({ message: "OTP Expired" });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  res.status(200).json({ message: "OTP verified successfully" });
};

// const resetPassword = async (req, res) => {
//   const { email, password } = req.body;
//   if(!password){
//     return res.status(400).json({ message: "Password is required" });
//     }
//   try {
//     const user = await UserSchema.findOne({ email });
//     const hashedPass = await bcrypt.hash(password, 10);
//     await UserSchema.updateOne(
//       { email: user.email },
//       {
//         $set: {
//           password: hashedPass,
//         },
//       }
//     );
//     res.status(200).json({ message: "Password Changed Successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error changing password", error });
//   }
// };

const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if(!newPassword || !confirmPassword){
    return res.status(400).json({ message: "Password is required" });
  }
  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  if (user.otp !== null || user.otpExpiry !== null) {
    return res.status(400).json({ message: "OTP verification required!!" });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};

module.exports = {
  postData,
  login,
  getUser,
  getUserByToken,
  updateProfile,
  sendOTP,
  verifyOtp,
  resetPassword,
};
