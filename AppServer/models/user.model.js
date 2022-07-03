const sql = require("../utils/database");
// constructor
class User {
	constructor(user) {
		this.username = user.username;
		this.email = user.email;
		this.password = user.password;
		this.accessLevel = user.accessLevel;
	}
	static create(newUser, result) {
		sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
			if (err) {
				result(err);
			} else {
				result(null, { id: res.insertId, ...newUser });
			}
		});
	}
	static findByUsername(username, result) {
		sql.query("SELECT * FROM users WHERE Username = ?", username , (err, res) => {
			if (err) {
				result(err);
			} else if(!res.length) {
				result("NOT_FOUND");
			} else {
				result(null, res[0]);
			}
		});
	}
	static findByEmail(email, result) {
		sql.query("SELECT * FROM users WHERE Email = ?", email , (err, res) => {
			if (err) {
				result(err);
			} else if(!res.length) {
				result("NOT_FOUND");
			} else {
				result(null, res[0]);
			}
		});
	}
}
module.exports = User;