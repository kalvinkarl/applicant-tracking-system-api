const sql = require("../../utils/database");

const Applicant = function(applicant){
	this.id = applicant.id;
	this.firstname = applicant.firstname;
	this.middlename = applicant.middlename;
	this.lastname = applicant.lastname;
	this.email = applicant.email;
	this.contactNumber = applicant.contactNumber;
	this.gender = applicant.gender;
	this.age = applicant.age;
	this.birthday = applicant.birthday;
}
Applicant.findById = (id, result) => {
	sql.query("SELECT * FROM applicants WHERE id = ?", id, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res[0]);
		}
	})
}
Applicant.findAllApplicants = (result) => {
	sql.query("SELECT * FROM applicants", null, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	})
}
Applicant.findApplicantsByJobApplicant = (result) => {
	sql.query("SELECT * FROM applicants WHERE id IN (SELECT DISTINCT(applicantId) FROM jobapplicants)", null, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	})
}
Applicant.findApplicantsByJobApplicantWithAchievement = (result) => {
	sql.query("SELECT ap.*,ac.applicantId as achievement FROM applicants as ap LEFT JOIN achievements as ac ON ac.applicantId = ap.id WHERE id IN (SELECT DISTINCT(applicantId) FROM jobapplicants)", null, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	})
}
module.exports = Applicant;