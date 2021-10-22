const user = require("../controllers/user_controller/user.controller.js");
const { verifyResetLink } = require("../middleware/note.middleware.js");
const validate = require("../middleware/user.middleware.js");

module.exports = (app) => {
  //Create login user
  app.post("/user/login", user.loginUser);

  //route for password
  app.post("/user/forgotPassword", user.forgotPassword);
  
  //route for reset password
  app.post("/user/reset/:resetId", verifyResetLink, user.resetPassword);
  
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
