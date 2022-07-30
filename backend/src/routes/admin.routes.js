const admin = require("../controllers/admin.controller");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
module.exports = app => {
	// Retrieve all applicants who applied for jobs
	router.get("/applicants", [auth.verifyToken, auth.isAdmin], admin.findApplicantsByJobApplicantWithAchievement);
	// Retrieve all registered applicants
	router.get("/applicants/all", [auth.verifyToken, auth.isAdmin], admin.findAllApplicants);
	// Retrieve all positions applied by applicants
	router.get("/applicants/jobs",[auth.verifyToken, auth.isAdmin], admin.findPositionsByApplicant);

	// Retrieve applicant achievements
	router.get("/applicants/achievements/:id",[auth.verifyToken, auth.isAdmin], admin.findAchievementsByApplicantId);
	
	// Create new applicant achievement
	router.post("/applicants/achievement",[auth.verifyToken, auth.isAdmin], admin.createAchievement);
	// Create new training
	router.post("/applicants/achievement/training",[auth.verifyToken, auth.isAdmin], admin.createTraining);
	// Create new experience
	router.post("/applicants/achievement/experience",[auth.verifyToken, auth.isAdmin], admin.createExperience);
	
	// Update applicant achievement
	router.put("/applicants/achievement",[auth.verifyToken, auth.isAdmin], admin.updateAchievement);
	// Update applicant training
	router.delete("/applicants/achievement/training/:applicantId",[auth.verifyToken, auth.isAdmin], admin.removeTrainingsByApplicant);
	// Update applicant experience
	router.delete("/applicants/achievement/experience/:applicantId",[auth.verifyToken, auth.isAdmin], admin.removeExperiencesByApplicant);

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
	app.use("/admin", router);
};