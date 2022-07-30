const config = require("../../config.json");
const mysql = require("mysql2");
// Create a connection to the database
const connection = mysql.createConnection({
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
	port: config.mysql.port,
});
// Open the MySQL connection
connection.connect(error => {
	if (error) throw error;
	console.log("Database is connected on database:"+config.mysql.database);
});
module.exports = connection;