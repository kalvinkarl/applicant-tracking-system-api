const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "Welcome to denr human resource website." }));

//Tutorials
require("./routes/tutorial.routes.js")(app);
//Users
require("./routes/user.routes.js")(app);

app.get("*", (req, res) => res.json({ error: "page not found" }));
app.listen(PORT, () => console.log('Server is running on port '+PORT));