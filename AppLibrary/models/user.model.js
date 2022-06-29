const sql = require("../GlobalConfig.js");
// constructor
class User {
    constructor(user) {
        this.accessionLevel = user.accessionLevel;
        this.username = user.username;
        this.password = user.password;
    }
    static create(NewUser, result) {
        sql.query("INSERT INTO users SET ?", NewUser, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Created User: ", { id: res.insertId, ...NewUser });
            result(null, { id: res.insertId, ...NewUser });
        });
    }
    static findByUsername(Username, result) {
        sql.query("SELECT * FROM users WHERE Username = ?", [Username] , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }
            // not found User with the id
            result({ kind: "not_found" }, null);
        });
    }
}
module.exports = User;