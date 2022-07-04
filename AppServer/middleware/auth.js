const jwt = require('jsonwebtoken');
const config = require("../config/config.json");

exports.verifyToken = (req, res, next) => {
	let authHeader = req.get('Authorization');
	if (!authHeader) {
		res.status(403).send({ message: "No token provided!" });
	}else{
		let token = authHeader.split(' ')[1];
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				res.status(401).send({ message: "Unauthorized!" });
			}else{
				req.userId = decoded.id;
				console.log("Request connection success to user id of " + req.userId);
				next();
			}
		});
	}
}
// exports.isAdmin = (req, res, next) => {
// 	User.findByPk(req.userId).then(user => {
// 	  user.getRoles().then(roles => {
// 		for (let i = 0; i < roles.length; i++) {
// 			if (roles[i].name === "admin") {
// 			next();
// 			return;
// 			}
// 		}
// 		res.status(403).send({
// 		  	message: "Require Admin Role!"
// 		});
// 			return;
// 	  	});
// 	});
// };