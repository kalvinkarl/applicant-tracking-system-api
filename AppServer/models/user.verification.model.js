const sql = require("../utils/database");
class UserVerification{
	constructor(userVerification){
		this.userId = userVerification.userId;
		this.uniqueString = userVerification.uniqueString;
		this.createdAt = userVerification.createdAt;
		this.expiresAt = userVerification.expiresAt;
	}
	static create(newUserVerification, result) {
		sql.query("INSERT INTO userverification SET ?", newUserVerification, (err, res) => {
			if (err) {
				result(err);
			} else {
				result(null, newUserVerification);
			}
		});
	}
}
module.exports = UserVerification;