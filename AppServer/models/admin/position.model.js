const sql = require("../../utils/database");


const Position = function(position){
	this.id = position.id,
	this.positionTitle = position.positionTitle,
	this.plantillaItemNo = position.plantillaItemNo,
	this.officeName = position.officeName,
	this.province = position.province,
	this.salaryJobPayScale = position.salaryJobPayScale,
	this.educationalRequirement = position.educationalRequirement,
	this.trainingRequirement = position.trainingRequirement,
	this.expirienceRequirement = position.expirienceRequirement,
	this.trainingCount = position.trainingCount,
	this.experienceCount = position.experienceCount,
	this.vice = position.vice,
	this.dutiesAndResponsibilities = position.dutiesAndResponsibilities,
	this.eligibilityRequirement = position.eligibilityRequirement,
	this.competency = position.competency,
	this.statusOfAppointment = position.statusOfAppointment,
	this.isVacant = position.isVacant,
	this.isForInterview = position.isForInterview,
	this.openingDate = position.openingDate,
	this.closingDate = position.closingDate,
	this.instructions = position.instructions
}
Position.findById = (id, result) => {
	sql.query("SELECT * FROM positions WHERE positionId = ?", id, (err,res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res[0]);
		}
	})
}
module.exports = Position;