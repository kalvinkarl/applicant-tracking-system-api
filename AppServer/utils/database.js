const mysql = require("mysql2");
const config = require("../config/config.json");
// Create a connection to the database
const connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database,
	port: config.port,
});
// Open the MySQL connection
connection.connect(error => {
	if (error) throw error;
	console.log("Database is connected on database:"+config.database);
});
module.exports = connection;