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
				result(err)
			} else {
				result(null, newUserVerification)
			}
		})
	}
	static findById(id,result) {
		sql.query("SELECT * FROM userverification WHERE UserID = ?", id , (err,res)=>{
			if(err){
				result(err)
			} else if(!res.length) {
				result("NOT_FOUND")
			} else {
				result(null, res[0])
			}
		})
	}
	static deleteById(id,result) {
		sql.query("DELETE FROM userverification WHERE UserID = ?", id , (err, res) => {
			if(err){
				result(err)
			} else if (res.affectedRows == 0){
				result("NOT_FOUND")
			} else {
				result(null, res)
			}
		})
	}
}
module.exports = UserVerification;