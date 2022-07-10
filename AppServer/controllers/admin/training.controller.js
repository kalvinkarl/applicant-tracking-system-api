const Traning = require("../../models/admin/training.model");
const Applicant = require("../../models/admin/applicant.model");
exports.create = (req,res) => {
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