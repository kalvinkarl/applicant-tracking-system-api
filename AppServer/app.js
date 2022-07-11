// require('dotenv').config();
const serverless = require("serverless-http");
const express = require("express");
// const cors = require("cors");
const app = express();
// const PORT = process.env.PORT;
// var corsOptions = {
// 	origin: process.env.ORIGIN
// };
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
// 	res.setHeader("Access-Control-Allow-Methods",process.env.METHODS);
// 	res.setHeader("Access-Control-Allow-Headers",process.env.HEADERS);
// 	next();
// });
app.get("/api", (req, res) => res.send("hello world"));
// //Users
// require("./routes/user.routes")(app);
// //Admin
// require("./routes/admin/applicant.routes")(app);
app.get("*", (req, res) => res.send("error"));
app.listen(3000, () => console.log("Server is running on port:"));
module.exports.handler = serverless(app);