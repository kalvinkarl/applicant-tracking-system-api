const Applicant = require("../../models/admin/applicant.model");

exports.findAll = (req,res) => {
	Applicant.findAll((error,result) => {
		if(!error){
			res.send(result);
		}else{
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "There is nothing in here!" });
			} else {
				res.status(500).send({ message: "Error retrieving a applicants in database", error });
			}
		}
	})
}
exports.findGeneral = (req,res) => {
	Applicant.findGeneral((error,result) => {
		if(!error){
			res.send(result);
		}else{
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "There is nothing in here!" });
			} else {
				res.status(500).send({ message: "Error retrieving a applicants in database", error });
			}
		}
	})
}
// exports.findByUsername = (req, res) => {
// 	let username = req.params.username.trim();
// 	User.findByUsername(username, (error, result) => {
// 		if (!error) {
// 			res.send(result);
// 		} else {
// 			if (error === "NOT_FOUND") {
// 				res.status(404).send({ message: "A user not found with username of " + username });
// 			} else {
// 				res.status(500).send({ message: "Error retrieving a user in database", error });
// 			}
// 		}
// 	})
// }