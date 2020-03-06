const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../utils/login/register");
const validateLoginInput = require("../../utils/login/login");

// Load User model
const User = require("../../db/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.get("/", (req, res) => {
    console.log("hey dave")
    res.json("anything you like")
})

module.exports = router;
