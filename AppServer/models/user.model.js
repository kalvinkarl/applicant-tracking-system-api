const sql = require("../utils/database");

const User = function(user){
	this.username = user.username;
	this.email = user.email;
	this.password = user.password;
	this.role = user.role;
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
User.findById = (id, result) => {
	sql.query("SELECT * FROM users WHERE id = ?", id , (err, res) => {
		if (err) {
			result(err);
		} else if(!res.length) {
			result("NOT_FOUND");
		} else {
			result(null, res[0]);
		}
	});
}
User.findByUsername = (username, result) => {
	sql.query("SELECT * FROM users WHERE username = ?", username , (err, res) => {
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
	sql.query("SELECT * FROM users WHERE email = ?", email , (err, res) => {
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
	sql.query("DELETE FROM users WHERE id = ?", id , (err, res) => {
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
	sql.query("UPDATE users SET verified = ? WHERE id = ?", [value, id], (err,res) => {
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