const users = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
module.exports = app => {
	// Create a new user
	router.post("/signup", users.create);
	// Login a user
	router.post("/signin", users.login);
	// Request new verification
	router.post("/verify", users.resendVerification);
	// User verification
	router.get("/verify/:id/:uniqueString", users.verify)
	//----------------------------------------------------------------------SECURED!-------------------------------------------------------
	// Retrieve a single user with their username
	router.get("/u/:username",[auth.verifyToken], users.findByUsername);
	// Retrieve a single User with their email address
	router.get("/e/:email",[auth.verifyToken], users.findByEmail);
	
	app.use('/api/users', router);
};