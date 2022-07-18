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
	this.status = applicant.status;
}
Applicant.findAll = (result) => {
	sql.query("SELECT applicant_id as id,firstname,middlename,lastname,email,contact_number as contactNumber,gender,age,birthday,status FROM applicant", null, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	})
}
Applicant.findGeneral = (result) => {
	sql.query("SELECT applicant_id as id,firstname,middlename,lastname,email,contact_number as contactNumber,gender,age,birthday,status FROM applicant WHERE status = 'documents completed' AND applicant_id NOT IN (SELECT applicantId FROM generalevaluations)", null, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	})
}

Applicant.findById = (id, result) => {
	sql.query("SELECT applicant_id as id,firstname,middlename,lastname,email,contact_number as contactNumber,gender,age,birthday,status FROM applicant WHERE applicant_id = ?", id, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res[0]);
		}
	})
}
module.exports = Applicant;
// User.findByEmail = (email, result) => {
// 	sql.query("SELECT * FROM users WHERE email = ?", email , (err, res) => {
// 		if (err) {
// 			result(err);
// 		} else if(!res.length) {
// 			result("NOT_FOUND");
// 		} else {
// 			result(null, res[0]);
// 		}
// 	});
// }