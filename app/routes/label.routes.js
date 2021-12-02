/**
 * Purpose : The API routes maps to the Controller
 * @file : label.router.js
 * @author  : Abdul Ziyan
 */

const label = require("../controllers/label.controller.js");
const validate = require("../middleware/label.middleware.js");

module.exports = (app) => {
  // Create a new label
  app.post("/label", validate, label.create);

  // Retrieve all label
  app.get("/label", label.findAll);

  // Retrieve a single Label
  app.get("/label/:labelId", label.findOne);

  // Update a label
  app.put("/label/:labelId", validate, label.update);

  // Delete a label
  app.delete("/label/:labelId", label.delete);
};
