const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const auth = require("./../middleware/auth");

router.post("/postregister", userController.postData);
router.post("/login", userController.login);
router.get("/getUserById/:id", userController.getUser);
router.get("/getUserByToken", auth, userController.getUserByToken);
router.put("/update", auth, userController.updateProfile);
router.post("/send-otp", userController.sendOTP);
router.post("/verify-otp", userController.verifyOtp);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
