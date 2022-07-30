const sql = require("../utils/database");

const UserVerification = function(userVerification){
	this.userId = userVerification.userId;
	this.uniqueString = userVerification.uniqueString;
	this.createdAt = userVerification.createdAt;
	this.expiresAt = userVerification.expiresAt;
}
UserVerification.create = (newUserVerification, result) => {
	sql.query("INSERT INTO userverifications SET ?", newUserVerification, (err, res) => {
		if (err) {
			result(err)
		} else {
			result(null, newUserVerification)
		}
	})
}
UserVerification.findById = (id,result) => {
	sql.query("SELECT * FROM userverifications WHERE userId = ? ORDER BY createdAt DESC", id , (err,res)=>{
		if(err){
			result(err)
		} else if(!res.length) {
			result("NOT_FOUND")
		} else {
			result(null, res)
		}
	})
}
UserVerification.deleteById = (id,result) => {
	sql.query("DELETE FROM userverifications WHERE userID = ?", id , (err, res) => {
		if(err){
			result(err)
		} else if (res.affectedRows == 0){
			result("NOT_FOUND")
		} else {
			result(null, res)
		}
	})
}
module.exports = UserVerification;