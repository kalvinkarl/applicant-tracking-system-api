const users = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const limitter = require("express-rate-limit");
const express = require("express");
const router = express.Router();
const signinLimitter = limitter({
	windowMs: 3 * 60 * 1000, // 3 minutes
	max: 5, // Limit each IP to 2 requests per `window` (here, per 60 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const signupLimitter = limitter({
	windowMs: 24 * 60 * 60 * 1000, // 24 hours
	max: 2, // Limit each IP to 1 requests per `window` (here, per 24 hours)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
module.exports = app => {
	// Login a user
	router.post("/signin", [signinLimitter], users.signin);
	// Create a new user
	router.post("/signup", [signupLimitter], users.signup);
	// Request new verification
	router.post("/verify" , users.resendVerification);
	// User verification
	router.get("/verify/:id/:uniqueString" , users.verify)
	//----------------------------------------------------------------------SECURED!-------------------------------------------------------
	// Retrieve a single user with their username
	router.get("/u/:username", [auth.verifyToken], users.findByUsername);
	// Retrieve a single User with their email address
	router.get("/e/:email", [auth.verifyToken], users.findByEmail);
	app.use('/users', router);
};