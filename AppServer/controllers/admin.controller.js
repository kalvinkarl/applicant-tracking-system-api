const Applicant = require("../models/admin/applicant.model");
const JobApplicant = require("../models/admin/job-applicant.model");
const Achievement = require("../models/admin/achievement.model");
const Training = require("../models/admin/training.model");
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
//all applicants who applied for jobs with achievements
exports.findApplicantsByJobApplicantWithAchievement = (req,res) => {
	Applicant.findApplicantsByJobApplicantWithAchievement((error,result) => {
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
//applicant achievements
exports.findAchievementsByApplicantId = (req,res) => {
	const applicantId = req.params.id.trim();
	Achievement.findByApplicantId(applicantId, (error,achievement) => {
		if(!error){
			Experience.findByApplicantId(applicantId, (error,experience) => {
				if(!error || error === 'NOT_FOUND'){
					Training.findByApplicantId(applicantId, (error,training) => {
						if(!error || error === 'NOT_FOUND'){
							res.send({achievement: achievement, experiences: experience, trainings: training});
						}else{
							res.status(500).send({ message: "Error retrieving all training in database", error });
						}
					});
				}else{
					res.status(500).send({ message: "Error retrieving all experience in database", error });
				}
			});
		}else{
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "No achievement was found!" });
			} else {
				res.status(500).send({ message: "Error retrieving all achievement in database", error });
			}
		}
	});
}
//insert new achievement
exports.createAchievement = (req,res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({ message: "Content can not be empty!" });
	}
	// check if applicant exist
	Applicant.findById(req.body.applicantId,(error)=>{
		if(!error){
			Achievement.findByApplicantId(req.body.applicantId,(err)=>{
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
						dateOfLastPromotion: new Date(req.body.dateOfLastPromotion),
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
	});
}
//insert new training
exports.createTraining = (req,res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({ message: "Content can not be empty!" });
	}
	// check if applicant exist
	Applicant.findById(req.body.applicantId,(error)=>{
		if(!error){
			let training = new Training({
				applicantId: req.body.applicantId,
				title: req.body.title,
				providerOrganizer: req.body.providerOrganizer,
				from: new Date(req.body.from),
				to: new Date(req.body.to),
				hours: req.body.hours,
				typeOfLD: req.body.typeOfLD
			})
			Training.create(training, (err, app) => {
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
	});



}
//insert new experience
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
				from: new Date(req.body.from),
				to: new Date(req.body.to)
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
	});
}