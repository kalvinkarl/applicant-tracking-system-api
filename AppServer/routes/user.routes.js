const users = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
module.exports = app => {
	// Retrieve all Users
	// router.get("/", users.findAll);

	// Retrieve a single user with their username
	router.get("/u/:username", users.findByUsername);
	
	// Retrieve a single User with their email address
	router.get("/e/:email", users.findByEmail);

	// Create a new user
	router.post("/signup", users.create);

	// Login a user
	router.post("/signin", users.login);

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