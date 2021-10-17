const user = require("../controllers/user.controller.js");
const validate = require("../middleware/user.middleware.js");

module.exports = (app) => {
  // Create a new UserInfo
  app.post("/user", validate, user.create);

  // Retrieve all User Info
  app.get("/user", user.findAll);

  // Retrieve a single UserInfo with userId
  app.get("/user/:userId", user.findOne);

  // Update a UserInfo with userId
  app.put("/user/:userId", validate, user.update);

  // Delete a UserInfo with userId
  app.delete("/user/:userId", user.delete);
};
