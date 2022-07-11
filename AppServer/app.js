const config = require("./config/config.json");
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = config.env.PORT;
var corsOptions = {
	origin: config.env.ORIGIN
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", config.env.ORIGIN);
	res.setHeader("Access-Control-Allow-Methods",config.env.METHODS);
	res.setHeader("Access-Control-Allow-Headers",config.env.HEADERS);
	next();
});
app.get("/api", (req, res) => res.json({ message: "Welcome to denr human resource website api." }));
//User
require("./routes/user.routes")(app);
//Admin
require("./routes/admin/applicant.routes")(app);
app.get("*", (req, res) => res.json({ error: "page not found" }));
app.listen(PORT, () => console.log("Server is running on port:"+PORT));
module.exports.handler = serverless(app);