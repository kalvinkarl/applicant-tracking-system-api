const JobApplicant = require("../../models/admin/job-applicant.model");


exports.findAll = (req, res) => {
	JobApplicant.findAll((error, result)=>{
		if(!error){
			res.send(result);
		}else{
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "There is nothing in here!" });
			} else {
				res.status(500).send({ message: "Error retrieving registered applicants in database", error });
			}
		}
	});
}
exports.findByPosition = (req, res) => {
	JobApplicant.findByPosition((error, result)=>{
		if(!error){
			res.send(result);
		}else{
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "There is nothing in here!" });
			} else {
				res.status(500).send({ message: "Error retrieving registered applicants in database", error });
			}
		}
	});
}