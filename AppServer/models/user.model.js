const sql = require("../utils/database");

const User = (user) => {
	this.username = user.username;
	this.email = user.email;
	this.password = user.password;
	this.accessLevel = user.accessLevel;
}
User.create = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
		if (err) {
			result(err);
		} else {
			result(null, { id: res.insertId, ...newUser });
		}
	});
}
User.findByUsername = (username, result) => {
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
User.findByEmail = (email, result) => {
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
User.deleteById = (id, result) => {
	sql.query("DELETE FROM users WHERE ID = ?", id , (err, res) => {
		if(err){
			result(err)
		}else if(res.affectedRows == 0){
			result("NOT_FOUND");
		}else{
			result(null, res[0]);
		}
	}) 
}
User.updateVerified = (id, value, result) => {
	sql.query("UPDATE users SET Verified = ? WHERE ID = ?", [value, id], (err,res) => {
		if(err){
			result(err)
		}else if(res.affectedRows == 0){
			result("NOT_FOUND")
		}else{
			result(null,res)
		}
	})
}
module.exports = User;