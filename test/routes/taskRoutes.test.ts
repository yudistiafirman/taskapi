import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";

chai.use(chaiHttp);
const { expect } = chai;
describe("Task Routes", () => {
  it("should get all tasks", (done) => {
    chai
      .request(app)
      .get("/api/v1/tasks")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should create a new task", (done) => {
    chai
      .request(app)
      .post("/api/v1/tasks")
      .send({
        title: "New Task",
        description: "Description",
        completed: false,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal("New Task");
        expect(res.body.description).to.equal("Description");
        expect(res.body.completed).to.equal(false);
        done();
      });
  });

  it("should get a task by ID", (done) => {
    chai
      .request(app)
      .get("/api/v1/tasks/known-task-id")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.equal("known-task-id");
        done();
      });
  });

  it("should return 404 when task does not exist", (done) => {
    chai
      .request(app)
      .get("/api/v1/tasks/non-existent-task-id")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should update a task", (done) => {
    chai
      .request(app)
      .put("/api/v1/tasks/known-task-id")
      .send({
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.equal("known-task-id");
        expect(res.body.title).to.equal("Updated Task");
        expect(res.body.description).to.equal("Updated Description");
        expect(res.body.completed).to.equal(true);
        done();
      });
  });

  it("should return 404 when updating non-existent task", (done) => {
    chai
      .request(app)
      .put("/api/v1/tasks/non-existent-task-id")
      .send({
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should delete a task", (done) => {
    chai
      .request(app)
      .delete("/api/v1/tasks/known-task-id")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should return 404 when deleting non-existent task", (done) => {
    chai
      .request(app)
      .delete("/api/v1/tasks/non-existent-task-id")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
