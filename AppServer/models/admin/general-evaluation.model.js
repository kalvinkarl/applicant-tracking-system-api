const sql = require("../../utils/database");

const GeneralEvaluation = function(generalEvaluation){
	this.applicantId = generalEvaluation.applicantId,
	this.eligibility = generalEvaluation.eligibility,
	this.salaryGrade = generalEvaluation.salaryGrade,
	this.placeOfAssignment = generalEvaluation.placeOfAssignment,
	this.statusOfAppointment = generalEvaluation.statusOfAppointment,
	this.educationalAttainment = generalEvaluation.educationalAttainment,
	this.dateOfLastPromotion = generalEvaluation.dateOfLastPromotion,
	this.latestIpcrRating = generalEvaluation.latestIpcrRating,
	this.remarks = generalEvaluation.remarks
}

GeneralEvaluation.create = (newGeneralEvaluation, result) => {
	sql.query("INSERT INTO generalevaluations SET ?", newGeneralEvaluation, (err, res) => {
		if (err) {
			result(err);
		} else {
			result(null, { applicantId: res.insertId, ...newGeneralEvaluation });
		}
	});
}
GeneralEvaluation.findById = (id, result) => {
	sql.query("SELECT * FROM generalevaluations WHERE applicantId = ?", id , (err, res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res[0]);
		}
	});
}

module.exports = GeneralEvaluation;