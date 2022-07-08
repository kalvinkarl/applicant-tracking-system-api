const GeneralEvaluation = require("../../models/admin/generalEvaluation.model");
const Applicant = require("../../models/admin/applicant.model");
exports.create = (req,res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({ message: "Content can not be empty!" });
	}
	// check if applicant exist
	Applicant.findById(req.body.applicantId,(error)=>{
		if(!error){
			GeneralEvaluation.findById(req.body.applicantId,(err)=>{
				if(!err){
					res.status(409).send({ message: "Error, duplicate record found." });
				}else if ("NOT_FOUND"){
					let generalEvaluation = new GeneralEvaluation({
						applicantId: req.body.applicantId,
						eligibility: req.body.eligibility,
						salaryGrade: req.body.salaryGrade,
						placeOfAssignment: req.body.placeOfAssignment,
						statusOfAppointment: req.body.statusOfAppointment,
						educationalAttainment: req.body.educationalAttainment,
						dateOfLastPromotion: req.body.dateOfLastPromotion,
						latestIpcrRating: req.body.latestIpcrRating,
						remarks: req.body.remarks
					})
					GeneralEvaluation.create(generalEvaluation, (er, app) => {
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