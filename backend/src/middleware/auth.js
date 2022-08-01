const jwt = require('jsonwebtoken');
const config = require("../../config.json");
const User = require("../models/user.model");
const secret = "kalvin-karl-secret-key";
exports.verifyToken = (req, res, next) => {
	let authHeader = req.get('Authorization');
	if (!authHeader) {
		res.status(403).send({ message: "No token provided!" });
	}else{
		let token = authHeader.split(' ')[1];
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.status(401).send({ message: "Unauthorized!", err });
			}else{
				req.id = decoded.id;
				next();
			}
		});
	}
}
exports.isSuperUser = (req, res, next) => {
	User.findById(req.id, (err,user)=>{
		if(!err){
			if (user.role === "su") {
				next();
			}else{
				res.status(403).send({ message: "Requires Super User Role!", owner:"Contact Kalvin Karl C. Nonato", number: "+639984283333", facebook: "https://facebook.com/kalvinkarl28" });
			}
		}else if("NOT_FOUND"){
			res.status(404).send({ message: "User not found" });
		}else{
			res.status(500).send({ message: "Error retrieving user in database" });
		}
	})
};
exports.isAdmin = (req, res, next) => {
	User.findById(req.id, (err,user)=>{
		if(!err){
			if (user.role === "hr" || user.role === "su") {
				next();
			}else{
				res.status(403).send({ message: "Require Admin Role!" });
			}
		}else if("NOT_FOUND"){
			res.status(404).send({ message: "User not found" });
		}else{
			res.status(500).send({ message: "Error retrieving user in database" });
		}
	})
};
exports.isApplicant = (req, res, next) => {
	User.findById(req.id, (err,user)=>{
		if(!err){
			if (user.role === "ap" || user.role === "su") {
				next();
			}else{
				res.status(403).send({ message: "Requires Applicant Role!" });
			}
		}else if("NOT_FOUND"){
			res.status(404).send({ message: "User not found" });
		}else{
			res.status(500).send({ message: "Error retrieving user in database" });
		}
	})
};
exports.isEvaluator = (req, res, next) => {
	User.findById(req.id, (err,user)=>{
		if(!err){
			if (user.role === "ev" || user.role === "su") {
				next();
			}else{
				res.status(403).send({ message: "Requires Evaluator Role!" });
			}
		}else if("NOT_FOUND"){
			res.status(404).send({ message: "User not found" });
		}else{
			res.status(500).send({ message: "Error retrieving user in database" });
		}
	})
};