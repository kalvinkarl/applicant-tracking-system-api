const sql = require("../../utils/database");
const Training = function(training){
	this.id = training.id;
	this.applicantId = training.applicantId;
	this.title = training.title;
	this.providerOrganizer = training.providerOrganizer;
	this.from = training.from;
	this.to = training.to;
	this.hours = training.hours;
	this.typeOfLD = training.typeOfLD;
}
Training.findByApplicantId = (id, result) => {
	sql.query("SELECT * FROM trainings WHERE applicantId = ?", id , (err, res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res);
		}
	});
}
Training.create = (newTraining, result) => {
	sql.query("INSERT INTO trainings SET ?", newTraining, (err, res) => {
		if (err) {
			result(err);
		} else {
			result(null, { applicantId: res.insertId, ...newTraining });
		}
	});
}
module.exports = Training;