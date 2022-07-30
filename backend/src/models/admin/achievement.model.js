const sql = require("../../utils/database");

const Achievement = function(achievement){
	this.applicantId = achievement.applicantId;
	this.eligibility = achievement.eligibility;
	this.salaryGrade = achievement.salaryGrade;
	this.placeOfAssignment = achievement.placeOfAssignment;
	this.statusOfAppointment = achievement.statusOfAppointment;
	this.educationalAttainment = achievement.educationalAttainment;
	this.dateOfLastPromotion = achievement.dateOfLastPromotion;
	this.latestIpcrRating = achievement.latestIpcrRating;
}

Achievement.findByApplicantId = (id, result) => {
	sql.query("SELECT * FROM achievements WHERE applicantId = ?", id , (err, res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res[0]);
		}
	});
}
Achievement.create = (newAchievement, result) => {
	sql.query("INSERT INTO achievements SET ?", newAchievement, (err, res) => {
		if (err) {
			result(err);
		} else {
			result(null, { applicantId: res.insertId, ...newAchievement });
		}
	});
}
Achievement.update = (id,achievement, result) => {
	sql.query("UPDATE achievements SET eligibility=?, salaryGrade=?, placeOfAssignment=?, statusOfAppointment=?, educationalAttainment=?, dateOfLastPromotion=?, latestIpcrRating=? WHERE applicantId = ?",
		[achievement.eligibility,
		achievement.salaryGrade,
		achievement.placeOfAssignment,
		achievement.statusOfAppointment,
		achievement.educationalAttainment,
		achievement.dateOfLastPromotion,
		achievement.latestIpcrRating,
		id], (err, res) => {
		if (err) {
			result(err);
		} else {
			result(null, { applicantId: res.insertId, ...achievement });
		}
	});
}

module.exports = Achievement;