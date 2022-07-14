const mysql = require("mysql2");
const config = require("../config/config.json");
// Create a pool to the database connection
const connection = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database,
	port: config.port
});

// Create a connection to the database
// const connection = mysql.createConnection({
// 	host: config.host,
// 	user: config.user,
// 	password: config.password,
// 	database: config.database,
// 	port: config.port
// });

// Open the MySQL connection
connection.getConnection(error => {
	if (error) throw error;
	console.log("Database is connected on database:"+config.database);
});
module.exports = connection;