const Experience = require("../../models/admin/experience.model");
const Applicant = require("../../models/admin/applicant.model");
exports.create = (req,res) => {
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