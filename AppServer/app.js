const serverless = require("serverless-http");
const config = require("./config/config.json");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = config.PORT;
var corsOptions = {
  origin: config.ORIGIN
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.json({ message: "Welcome to denr human resource website api local." }));
//Users routes
require("./routes/user.routes")(app);
//Admin(hr) routes
require("./routes/admin.routes")(app);
app.get("*", (req, res) => res.json({ error: "page not found" }));
app.listen(PORT, () => console.log("Server is running on port:"+PORT));

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  // you can do other things here
  const result = await handler(event, context);
  // and here
  return result;
}