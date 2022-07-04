const users = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
module.exports = app => {
	// Create a new user
	router.post("/signup", users.create);
	// Login a user
	router.post("/signin", users.login);
	// User verification
	router.get("/verify/:id/:uniqueString", users.verify)
	//----------------------------------------------------------------------SECURED!-------------------------------------------------------
	// Retrieve a single user with their username
	router.get("/u/:username",[auth.verifyToken], users.findByUsername);
	
	// Retrieve a single User with their email address
	router.get("/e/:email",[auth.verifyToken], users.findByEmail);

	// Retrieve all Users
	// router.get("/", users.findAll);

	// // Retrieve all published Users
	// router.get("/published", users.findAllPublished);

	// // Update a User with id
	// router.put("/:ID", users.update);

	// // Delete a User with id
	// router.delete("/:ID", users.delete);

	// // Delete all Users
	// router.delete("/", users.deleteAll);
	app.use('/api/users', router);
};