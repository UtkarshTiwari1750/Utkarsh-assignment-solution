// Import required modules
const express = require("express");
const router = express.Router();

// Import Contollers
const {signup, login, sendotp, getUser } = require("../controllers/Auth");
const {auth} = require("../middleware/Auth");
// Routers
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendotp);
router.post("/getUser", auth, getUser)

module.exports = router;
