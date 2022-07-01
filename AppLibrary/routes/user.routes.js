module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    // Retrieve a single User with username
    router.get("/:Username", users.findByUsername);

    // Login a user
    router.post("/login", users.login);

    // // Retrieve all published Users
    // router.get("/published", users.findAllPublished);


    // // Update a User with id
    // router.put("/:ID", users.update);

    // // Delete a User with id
    // router.delete("/:ID", users.delete);
    
    // // Delete all Users
    // router.delete("/", users.deleteAll);
    app.use('/api/users', router);
  };