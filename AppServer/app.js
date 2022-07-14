const config = require("./config/config.json");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = config.env.PORT;
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.json({ message: "Welcome to denr human resource website api." }));
//Users
require("./routes/user.routes")(app);
//Admins
require("./routes/admin/applicant.routes")(app);
app.get("*", (req, res) => res.json({ error: "page not found" }));
app.listen(PORT, () => console.log("Server is running on port:"+PORT));