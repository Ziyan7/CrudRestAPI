const { Error } = require("mongoose");
const {
  createNewUser,
  findMyUsers,
  findOneUser,
  updateUser,
  deleteById,
} = require("../service/user.service.js");

// Create a UserInfo
exports.create = (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let number = req.body.MobileNumber;
  createNewUser(name, age, number, (error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating user info",
      });
    }
    res.status(200).json({
      message: "created UserInfo successfully",
      createdNote: {
        name: data.name,
        age: data.age,
        number: data.MobileNumber,
      },
    });
  });
};

/*Retrieve and return all UserInfo from the database.
callback function is used 
*/
exports.findAll = (req, res) => {
  findMyUsers((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving notes.",
      });
    }
    res.send(data);
  });
};

// Retrieve and return UserInfo from the database based on the id
exports.findOne = (req, res) => {
  let id = req.params.userId;
  findOneUser(id, (error, data) => {
    if (error) {
      console.log("hfghf")
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + id,
      });
    }
    res.send(data);
  });
};

/* Update a Userinfo based on the userId 
 with request and response as parameters
 */
exports.update = (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let number = req.body.MobileNumber;
  let id = req.params.userId;
  updateUser(id, name, age, number, (error, data) => {
    if (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id" + id,
        });
      }
    }
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    res.send(data);
  });
};

/* Delete a user ingfo based on userId with
   with request and response as parameters
   */
exports.delete = (req, res) => {
  let id = req.params.userId;
  deleteById(id, (error, data) => {
    if (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id" + id,
        });
      }
    }
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    res.send(data + " Deleted Succefully");
  });
};
