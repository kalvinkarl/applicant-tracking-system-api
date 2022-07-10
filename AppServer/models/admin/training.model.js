const sql = require("../../utils/database");
const Traning = function(traning){
	this.applicantId = traning.applicantId,
	this.title = traning.title,
	this.providerOrganizer = traning.providerOrganizer,
	this.from = traning.from,
	this.to = traning.to,
	this.hours = traning.hours,
	this.typeOfLD = traning.typeOfLD
}
Traning.create = (newTraining, result) => {
	sql.query("INSERT INTO trainings SET ?", newTraining, (err, res) => {
		if (err) {
			result(err);
		} else {
			result(null, { applicantId: res.insertId, ...newTraining });
		}
	});
}
module.exports = Traning;