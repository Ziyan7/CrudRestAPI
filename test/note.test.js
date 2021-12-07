const chai = require("chai");
const chaiHttp = require("chai-http");
var server = require("../server");
const noteInput = require("./note.json");

const should = chai.should();
chai.use(chaiHttp);

describe("Post userCredetial in /user/login", () => {
  let token = "";
  const userData = noteInput.userCredentials;
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

  /**
   * POST request test
   * positive and negative note creation
   */
  describe("Post Note Data in /notes/", () => {
    it("Given empty title it should not make POST request for note ", (done) => {
      const userData = noteInput.invalidTitle;
      chai
        .request(server)
        .post("/notes")
        .set({ Authorization: `bearer ${token}` })
        .send(userData)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Note content can not be empty");
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it("Given empty title it should not make POST request for note ", (done) => {
      const userData = noteInput.validTitle;
      chai
        .request(server)
        .post("/notes")
        .set({ Authorization: `bearer ${token}` })
        .send(userData)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("created note successfully");
          if (error) {
            return done(error);
          }
          done();
        });
    });
  });

  /**
   * GET request test
   * positive and negative note retrieve test
   */
  describe("Get Note details from /notes/", () => {
    it("retrieve all notes ", (done) => {
      chai
        .request(server)
        .get("/notes")
        .set({ Authorization: `bearer ${token}` })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Array").should.have.a("object");
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it("retrieve notes based on invalidId ", (done) => {
      chai
        .request(server)
        .get("/notes/" + noteInput.invalidId.userId)
        .set({ Authorization: `bearer ${token}` })
        .end((error, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Error retrieving note with id " + noteInput.invalidId.userId);
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it("retrieve notes based on validId ", (done) => {
      chai
        .request(server)
        .get("/notes/" + noteInput.validUserId.userId)
        .set({ Authorization: `bearer ${token}` })
        .end((error, res) => {
          res.should.have.status(200);
          if (error) {
            return done(error);
          }
          done();
        });
    });
  });

  /**
 * Put request test
 * positive and negative note Test
 */
  describe("Put Note details in /notes/:noteId", () => {
    it("Update note details using invalid title", (done) => {
      const userData = noteInput.invalidTitle;
      chai
        .request(server)
        .put("/notes/" + noteInput.validUserId.userId)
        .set({ Authorization: `bearer ${token}` })
        .send(userData)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Note content can not be empty");
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it("Update note details using valid details", (done) => {
      const userData = noteInput.validDetails;
      chai
        .request(server)
        .put("/notes/" + noteInput.validUserId.userId)
        .set({ Authorization: `bearer ${token}` })
        .send(userData)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          if (error) {
            return done(error);
          }
          done();
        });
    });
  });

  /**
   * Delete request test
   * positive and negative Note details Test
   */

  describe("delete note details in /notes/:noteId", () => {
    it("delete note detail using invalid Id", (done) => {
      chai
        .request(server)
        .delete("/notes/" + noteInput.invalidId.userId)
        .set({ Authorization: `bearer ${token}` })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Note not found with id " + noteInput.invalidId.userId);
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it("delete note detail using invalid Id", (done) => {
      chai
        .request(server)
        .delete("/notes/" + noteInput.validUserId.userId)
        .set({ Authorization: `bearer ${token}` })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Note deleted successfully!");
          if (error) {
            return done(error);
          }
          done();
        });
    });
  });
});
