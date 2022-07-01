const User = require("../models/user.model.js");
const Bcrypt = require("bcryptjs");
// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a User
    let user = new User({
        accessionLevel: req.body.AccessionLevel,
        username: req.body.Username,
        // Encrypted password
        password: await Bcrypt.hash(req.body.Password, 12)
    });
    User.findByUsername(req.body.Username, (err,data) => {
      if(err){
        if (err.kind === "not_found") {
          // Save User in the database
          User.create(user, (err, data) => {
              if (err)
                  res.status(500).send({
                  message:
                      err.message || "Some error occurred while creating the User."
                  });
              else res.send(data);
          });
        }
      }else{
        res.status(409).send({
          message: 'A Username ' + data.Username + ' is already exist.'
        });
      }
    });
};
// Find a single User by Username
exports.findByUsername = (req, res) => {
  User.findByUsername(req.params.Username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: 'Not found User with Username:' + req.params.Username
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with Username " + req.params.Username
        });
      }
    } else res.send(data);
  });
};
exports.auth = (req,res) => {
  User.findByUsername(req.body.Username, (err,data) => {
    if(err){
      if (err.kind === "not_found") {
      }
    }else{
      res.status(409).send({
        message: 'A Username ' + data.Username + ' is already exist.'
      });
    }
  });
};