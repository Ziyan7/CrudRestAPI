const chai = require("chai");
const chaiHttp = require("chai-http");
var server = require("../server");
const userInput = require("./user.json");

const should = chai.should();
chai.use(chaiHttp);

/**
 * POST request test
 * positive and negative Login Test
 */

describe("Post userCredetial in /user/login", () => {
  let token = "";
  const userData = userInput.userCredentials;
  beforeEach((done) => {
    chai
      .request(server)
      .post("/user/login")
      .send(userData)
      .end((error, res) => {
        res.should.have.status(200);
        token = res.body.message;
        if (error) {
          return done(error);
        }
        done();
      });
  });
  it("Given invalid user emailId it should not make POST request for login user and fail to generate token", (done) => {
    const userData = userInput.invalidEmailId;
    chai
      .request(server)
      .post("/user/login")
      .send(userData)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(500);
        res.body.should.have.property("message").eql("Invalid EmailId");

        if (error) {
          return done(error);
        }
        done();
      });
  });

  it("Given invalid password it should not make POST request for login user and fail to generate token", (done) => {
    const userData = userInput.invalidPassword;
    chai
      .request(server)
      .post("/user/login")
      .send(userData)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(500);
        res.body.should.have.property("message").eql("incorrect password");

        if (error) {
          return done(error);
        }
        done();
      });
  });

  it("Given valid user credentials it should make POST request for login user and generate token", (done) => {
    const userData = userInput.userCredentials;
    chai
      .request(server)
      .post("/user/login")
      .send(userData)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(200);
        res.body.should.have.property("message").eql(token);
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it("Register User Info", (done) => {
    const userData = userInput.registerUser;
    chai
      .request(server)
      .post("/user")
      .send(userData)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(200);
        if (error) {
          return done(error);
        }
        done();
      });
  });
});

/**
 * Get request test
 * positive and negative UserInfo Test
 */
describe("Get usercredetial in /user", () => {
  it("Obtain all user Info", (done) => {
    chai
      .request(server)
      .get("/user")
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array").should.have.a("object");
        if (error) {
          return done(error);
        }
        done();
      });
  });
});

describe("Get usercredetial in /user/:userId", () => {
  it("Fetching user Info using invalid Id", (done) => {
    chai
      .request(server)
      .get("/user/" + userInput.invalidId.userId)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(500);
        res.body.should.have
          .property("message")
          .eql("Couldn't find User with given id");
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it("Fetching user Info using valid Id", (done) => {
    chai
      .request(server)
      .get("/user/" + userInput.validUserId.userId)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(200);
        if (error) {
          return done(error);
        }
        done();
      });
  });
});

/**
 * Put request test
 * positive and negative UserInfo Test
 */
describe("Put usercredetial in /user/:userId", () => {
  it("Update user Info using invalid Id", (done) => {
    const userData = userInput.validUpdate;
    chai
      .request(server)
      .put("/user/" + userInput.invalidId.userId)
      .send(userData)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(500);
        res.body.should.have
          .property("message")
          .eql("Couldn't find User with given id");
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it("Update user Info without firstname", (done) => {
    const userData = userInput.invalidUpdate;
    chai
      .request(server)
      .put("/user/" + userInput.validUserId.userId)
      .send(userData)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql('"firstName" is not allowed to be empty');
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it("Update user Info with valid info", (done) => {
    const userData = userInput.validUpdate;
    chai
      .request(server)
      .put("/user/" + userInput.validUserId.userId)
      .send(userData)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Updated Successfully");
        if (error) {
          return done(error);
        }
        done();
      });
  });
});

/**
 * Delete request test
 * positive and negative UserInfo Test
 */

describe("delete usercredetial in /user/:userId", () => {
  it("delete user Info using invalid Id", (done) => {
    chai
      .request(server)
      .delete("/user/" + userInput.invalidId.userId)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(500);
        res.body.should.have
          .property("message")
          .eql("Couldn't find User with given id");
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it("delete user Info using valid Id", (done) => {
    chai
      .request(server)
      .delete("/user/" + userInput.validUserId.userId)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(200);
        if (error) {
          return done(error);
        }
        done();
      });
  });
});
