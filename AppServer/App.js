//require('dotenv').config();
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
var corsOptions = {
	origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
	next();
});
app.get("/", (req, res) => res.json({ message: "Welcome to denr human resource website api." }));
//Users
require("./routes/user.routes")(app);
//Admin
require("./routes/admin/applicant.routes")(app);
app.get("*", (req, res) => res.json({ error: "page not found" }));
app.listen(PORT, () => console.log("Server is running on port:"+PORT));
module.exports.handler = serverless(app);