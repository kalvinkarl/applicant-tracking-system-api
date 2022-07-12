const config = require("./config/config.json");
const serverless = require("serverless-http");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.json({ message: "Welcome to denr human resource website api." }));
//User
require("./routes/user.routes")(app);
//Admin
require("./routes/admin/applicant.routes")(app);
app.get("*", (req, res) => res.json({ error: "page not found" }));
module.exports.handler = serverless(app);