const Applicant = require("../models/admin/applicant.model");
const JobApplicant = require("../models/admin/job-applicant.model");
const Achievement = require("../models/admin/achievement.model");
const Traning = require("../models/admin/training.model");
const Experience = require("../models/admin/experience.model");
//all registered applicants
exports.findAllApplicants = (req,res) => {
	Applicant.findAllApplicants((error,result) => {
		if(!error){
			res.send(result);
		}else{
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "There is nothing in here!" });
			} else {
				res.status(500).send({ message: "Error retrieving all applicants in database", error });
			}
		}
	})
}
//all applicants who applied for jobs
exports.findApplicantsByJobApplicant = (req,res) => {
	Applicant.findApplicantsByJobApplicant((error,result) => {
		if(!error){
			res.send(result);
		}else{
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "There is nothing in here!" });
			} else {
				res.status(500).send({ message: "Error retrieving registered applicants in database", error });
			}
		}
	})
}
//all positions applied by applicants
exports.findPositionsByApplicant = (req, res) => {
	JobApplicant.findPositionsByApplicant((error, result)=>{
		if(!error){
			res.send(result);
		}else{
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "There is nothing in here!" });
			} else {
				res.status(500).send({ message: "Error retrieving job applicants in database", error });
			}
		}
	});
}
// insert new achievement
exports.createAchievement = (req,res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({ message: "Content can not be empty!" });
	}
	// check if applicant exist
	Applicant.findById(req.body.applicantId,(error)=>{
		if(!error){
			Achievement.findById(req.body.applicantId,(err)=>{
				if(!err){
					res.status(409).send({ message: "Error, duplicate record found." });
				}else if ("NOT_FOUND"){
					let achievement = new Achievement({
						applicantId: req.body.applicantId,
						eligibility: req.body.eligibility,
						salaryGrade: req.body.salaryGrade,
						placeOfAssignment: req.body.placeOfAssignment,
						statusOfAppointment: req.body.statusOfAppointment,
						educationalAttainment: req.body.educationalAttainment,
						dateOfLastPromotion: req.body.dateOfLastPromotion,
						latestIpcrRating: req.body.latestIpcrRating
					})
					Achievement.create(achievement, (er, app) => {
						if(!er){
							res.send(app);
						}else{
							res.status(500).send({ message: "Error inserting a general evaluation in database", er });
						}
					})
				}else{
					res.status(500).send({ message: "Error finding for existing general evaluation in database", err });
				}
			})
		}else if ("NOT_FOUND"){
			res.status(404).send({ message: "Can't proceed with unexisting applicant" });
		}else{
			res.status(500).send({ message: "Error finding for existing general evaluation in database", err });
		}
	})
}
// insert new training
exports.createTraining = (req,res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({ message: "Content can not be empty!" });
	}
	// check if applicant exist
	Applicant.findById(req.body.applicantId,(error)=>{
		if(!error){
			let training = new Traning({
				applicantId: req.body.applicantId,
				title: req.body.title,
				providerOrganizer: req.body.providerOrganizer,
				from: req.body.from,
				to: req.body.to,
				hours: req.body.hours,
				typeOfLD: req.body.typeOfLD
			})
			Traning.create(training, (err, app) => {
				if(!err){
					res.send(app);
				}else{
					res.status(500).send({ message: "Error inserting a training in database", err });
				}
			})
		}else if ("NOT_FOUND"){
			res.status(404).send({ message: "Can't proceed with unexisting applicant" });
		}else{
			res.status(500).send({ message: "Error finding for existing applicant in database", err });
		}
	})



}
// insert new experience
exports.createExperience = (req,res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({ message: "Content can not be empty!" });
	}
	// check if applicant exist
	Applicant.findById(req.body.applicantId,(error)=>{
		if(!error){
			let experience = new Experience({
				applicantId: req.body.applicantId,
				positionDesignation: req.body.positionDesignation,
				from: req.body.from,
				to: req.body.to
			})
			Experience.create(experience, (err, app) => {
				if(!err){
					res.send(app);
				}else{
					res.status(500).send({ message: "Error inserting a experience in database", err });
				}
			})
		}else if ("NOT_FOUND"){
			res.status(404).send({ message: "Can't proceed with unexisting applicant" });
		}else{
			res.status(500).send({ message: "Error finding for existing experience in database", err });
		}
	})
}