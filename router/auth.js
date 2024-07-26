const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth")
const authControl = require("../middlewares/auth-control")


// Log in
router.get("/login", auth.get_login);
router.post("/login", auth.post_login);

// Register
router.get("/register", auth.get_register);
router.post("/register", auth.post_register);

// DashBoard
router.get("/dashboard", authControl, auth.get_dashboard);

// Log out
router.get("/logout", auth.get_logout);

module.exports = router