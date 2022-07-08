const sql = require("../../utils/database");

const Experience = function(experience){
	this.applicantId = experience.applicantId;
	this.positionDesignation = experience.positionDesignation;
	this.from = experience.from;
	this.to = experience.to;
}
Experience.create = (newExperience, result) => {
	sql.query("INSERT INTO experiences SET ?", newExperience, (err, res) => {
		if (err) {
			result(err);
		} else {
			result(null, { applicantId: res.insertId, ...newExperience });
		}
	});
}

module.exports = Experience;