const applicant = require("../../controllers/admin/applicant.controller");
const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
module.exports = app => {
	// Retrieve all applicants
	router.get("",[auth.verifyToken, auth.isAdmin], applicant.findAll);
	
	// Retrieve all applicants
	router.get("/general",[auth.verifyToken, auth.isAdmin], applicant.findGeneral);

	// // Create a new user
	// router.post("/signup", users.create);
	// // Login a user
	// router.post("/signin", users.login);
	// // Request new verification
	// router.post("/verify", users.resendVerification);
	// // User verification
	// router.get("/verify/:id/:uniqueString", users.verify)

	// // Retrieve a single user with their username
	// router.get("/u/:username",[auth.verifyToken], users.findByUsername);

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
	app.use("/api/admin/applicants", router);
};