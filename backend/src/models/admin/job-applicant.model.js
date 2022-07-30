const sql = require("../../utils/database");

const JobApplicant = function(jobApplicant){
	this.applicantId = jobApplicant.applicantId;
	this.positionId = jobApplicant.positionId;
}
JobApplicant.findAll = (result) => {
	sql.query("SELECT applicants.*,positions.* FROM jobapplicants INNER JOIN applicants ON applicants.id = jobapplicants.applicantId INNER JOIN positions ON positions.id = jobapplicants.positionId;", null, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	})
}
JobApplicant.findPositionsByApplicant = (result) => {
	sql.query(`SELECT
		applicantId,
		positions.id as positionId,
		positions.positionTitle,
		positions.plantillaItemNo,
		positions.officeName,
		positions.province,
		positions.salaryGrade,
		positions.educationalRequirement,
		positions.trainingRequirement,
		positions.experienceRequirement,
		positions.trainingCount,
		positions.experienceCount,
		positions.vice,
		positions.dutiesAndResponsibilities,
		positions.eligibilityRequirement,
		positions.competency,
		positions.statusOfAppointment
		FROM denr.jobapplicants
		INNER JOIN positions
		ON positions.id = jobapplicants.positionId`, null, (err,res) => {
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