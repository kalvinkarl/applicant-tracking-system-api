const users = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const limitter = require("express-rate-limit");
const express = require("express");
const router = express.Router();
const isFailed = async (attempts) => {
	if(attempts >= 5){
		console.log("failed 5 times");
	}
}
const signinLimitter = limitter({
	windowMs: 3 * 60 * 1000, // 3 minutes
	message: 'Too many login failed attempts. Please try again after 3 minutes',
	max: 5, // Limit each IP to 2 requests per `window` (here, per 60 minutes)
	// max: async (req, res) => {
	// 	if (await res.statusCode === 200)
	// 		return 5
	// },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


const signupLimitter = limitter({
	//message: 'Too many accounts created from this IP, please try again after an hour',
	windowMs: 24 * 60 * 60 * 1000, // 24 hours
	max: 2, // Limit each IP to 1 requests per `window` (here, per 24 hours)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
module.exports = app => {
	// Login a user
	router.post("/signin", users.signin , [signinLimitter, users.login]);
	// Create a new user
	router.post("/signup", users.signup , [signupLimitter, users.register]);
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