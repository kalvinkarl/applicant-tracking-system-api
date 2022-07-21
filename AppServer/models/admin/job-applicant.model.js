const sql = require("../../utils/database");

const JobApplicant = function(jobApplicant){
	this.applicantId = jobApplicant.applicantId,
	this.positionId = jobApplicant.positionId,
	this.status = jobApplicant.status
}
JobApplicant.findAll = (result) => {
	sql.query("SELECT applicants.applicant_id as id,applicants.firstname,applicants.middlename,applicants.lastname,applicants.email,applicants.contact_number as contactNumber,applicants.gender,applicants.age,applicants.birthday,applicants.status,positions.*,jobapplicants.status FROM denr.jobapplicants INNER JOIN applicants ON applicants.applicant_id = jobapplicants.positionId INNER JOIN positions ON positions.positionId = jobapplicants.positionId;", null, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	})
}
JobApplicant.findByPosition = (result) => {
	sql.query("SELECT applicants.applicant_id as applicantId,positions.*,jobapplicants.status FROM denr.jobapplicants INNER JOIN applicants ON applicants.applicant_id = jobapplicants.positionId INNER JOIN positions ON positions.positionId = jobapplicants.positionId;", null, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	})
}
module.exports = JobApplicant;