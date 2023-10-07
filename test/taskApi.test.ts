import {
  TASK_NOT_FOUND,
  TASK_SUCCESSFULLY_CREATED,
  TASK_SUCCESSFULLY_DELETED,
  TASK_SUCCESSFULLY_UPDATED,
} from "../src/const/message";
import app from "../src/app";
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.use(chaiHttp);
chai.should();

describe("TaskController", () => {
  const mockTaskRequestBody = {
    title: "Test Task Created",
    description: "Test Description Created",
  };

  const mockTaskQuery = {
    page: 1,
    pageSize: 10,
    sortBy: "created_at",
    sortOrder: "DESC",
  };
  //  after running the test, kindly change the validTestid with the exising one because it will deleted after run test for delete task

  const validTestId = "d5d96371-b3cf-44fd-a6b7-3ca4eef560a2";
  const nonValidTestId = "217bfbe7-b412-434d-9ecc-27d59c2daa23";

  describe("getAllTasks", () => {
    it("should get all tasks successfully", (done) => {
      chai
        .request(app)
        .get("/api/v1/tasks")
        .query(mockTaskQuery)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("totalPage").that.is.a("number");
          expect(res.body).to.have.property("page").that.is.a("number");
          expect(res.body.page).to.equal(mockTaskQuery.page);
          expect(res.body).to.have.property("count").that.is.a("number");
          expect(res.body.count).to.equal(res.body.count);
          expect(res.body).to.have.property("data").that.is.an("array");

          expect(res.body.data[0]).to.have.property("id").that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("title")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("description")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("completed")
            .that.is.a("boolean");
          expect(res.body.data[0])
            .to.have.property("created_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("updated_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("deleted_at")
            .that.is.a("null");

          done();
        });
    });

    it("should get all tasks sorted by created_at in descending order", (done) => {
      chai
        .request(app)
        .get("/api/v1/tasks")
        .query(mockTaskQuery)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("totalPage").that.is.a("number");
          expect(res.body).to.have.property("page").that.is.a("number");
          expect(res.body.page).to.equal(mockTaskQuery.page);
          expect(res.body).to.have.property("count").that.is.a("number");
          expect(res.body.count).to.equal(res.body.count);
          expect(res.body).to.have.property("data").that.is.an("array");

          expect(res.body.data[0]).to.have.property("id").that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("title")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("description")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("completed")
            .that.is.a("boolean");
          expect(res.body.data[0])
            .to.have.property("created_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("updated_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("deleted_at")
            .that.is.a("null");

          for (let i = 1; i < res.body.data.length; i++) {
            const currentTaskCreatedAt = new Date(res.body.data[i].created_at);
            const previousTaskCreatedAt = new Date(
              res.body.data[i - 1].created_at
            );
            expect(currentTaskCreatedAt).to.be.at.most(previousTaskCreatedAt);
          }

          done();
        });
    });

    it("should get all tasks sorted by created_at in ascending order", (done) => {
      chai
        .request(app)
        .get("/api/v1/tasks")
        .query({ ...mockTaskQuery, sortOrder: "ASC" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("totalPage").that.is.a("number");
          expect(res.body).to.have.property("page").that.is.a("number");
          expect(res.body.page).to.equal(mockTaskQuery.page);
          expect(res.body).to.have.property("count").that.is.a("number");
          expect(res.body.count).to.equal(res.body.count);
          expect(res.body).to.have.property("data").that.is.an("array");

          expect(res.body.data[0]).to.have.property("id").that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("title")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("description")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("completed")
            .that.is.a("boolean");
          expect(res.body.data[0])
            .to.have.property("created_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("updated_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("deleted_at")
            .that.is.a("null");

          for (let i = 1; i < res.body.data.length; i++) {
            const currentTaskCreatedAt = new Date(res.body.data[i].created_at);
            const previousTaskCreatedAt = new Date(
              res.body.data[i - 1].created_at
            );
            expect(currentTaskCreatedAt).to.be.at.least(previousTaskCreatedAt);
          }

          done();
        });
    });

    it("should get all completed tasks", (done) => {
      chai
        .request(app)
        .get("/api/v1/tasks")
        .query({
          ...mockTaskQuery,
          completed: "true",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("totalPage").that.is.a("number");
          expect(res.body).to.have.property("page").that.is.a("number");
          expect(res.body.page).to.equal(mockTaskQuery.page);
          expect(res.body).to.have.property("count").that.is.a("number");
          expect(res.body.count).to.equal(res.body.count);
          expect(res.body).to.have.property("data").that.is.an("array");

          expect(res.body.data[0]).to.have.property("id").that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("title")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("description")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("completed")
            .that.is.a("boolean");
          expect(res.body.data[0])
            .to.have.property("created_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("updated_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("deleted_at")
            .that.is.a("null");

          res.body.data.forEach((task) => {
            expect(task.completed).to.equal(true);
          });

          done();
        });
    });

    it("should get all incomplete tasks", (done) => {
      chai
        .request(app)
        .get("/api/v1/tasks")
        .query({
          ...mockTaskQuery,
          completed: "false",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("totalPage").that.is.a("number");
          expect(res.body).to.have.property("page").that.is.a("number");
          expect(res.body.page).to.equal(mockTaskQuery.page);
          expect(res.body).to.have.property("count").that.is.a("number");
          expect(res.body.count).to.equal(res.body.count);
          expect(res.body).to.have.property("data").that.is.an("array");

          expect(res.body.data[0]).to.have.property("id").that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("title")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("description")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("completed")
            .that.is.a("boolean");
          expect(res.body.data[0])
            .to.have.property("created_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("updated_at")
            .that.is.a("string");
          expect(res.body.data[0])
            .to.have.property("deleted_at")
            .that.is.a("null");

          res.body.data.forEach((task) => {
            expect(task.completed).to.equal(false);
          });

          done();
        });
    });
  });

  describe("getTaskById", () => {
    it("should get a task by ID successfully", (done) => {
      chai
        .request(app)
        .get(`/api/v1/tasks/${validTestId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id").that.is.a("string");
          expect(res.body).to.have.property("title").that.is.a("string");
          expect(res.body).to.have.property("description").that.is.a("string");
          expect(res.body).to.have.property("completed").that.is.a("boolean");
          expect(res.body).to.have.property("created_at").that.is.a("string");
          expect(res.body).to.have.property("updated_at").that.is.a("string");
          expect(res.body).to.have.property("deleted_at").that.is.null;
          done();
        });
    });

    it("should handle task not found", (done) => {
      chai
        .request(app)
        .get(`/api/v1/tasks/${nonValidTestId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object");
          expect(res.body)
            .to.have.property("message")
            .that.equals(TASK_NOT_FOUND);
          done();
        });
    });
  });

  describe("createTask", () => {
    it("should create a task successfully", (done) => {
      chai
        .request(app)
        .post("/api/v1/tasks")
        .send(mockTaskRequestBody)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body)
            .to.have.property("message")
            .that.equals(TASK_SUCCESSFULLY_CREATED);
          expect(res.body).to.have.property("data").that.is.an("object");
          expect(res.body.data).to.have.property("id").that.is.a("string");
          expect(res.body.data).to.have.property("title").that.is.a("string");
          expect(res.body.data)
            .to.have.property("description")
            .that.is.a("string");
          expect(res.body.data)
            .to.have.property("completed")
            .that.is.a("boolean");
          expect(res.body.data)
            .to.have.property("created_at")
            .that.is.a("string");
          expect(res.body.data)
            .to.have.property("updated_at")
            .that.is.a("string");
          expect(res.body.data).to.have.property("deleted_at").that.is.null;
          done();
        });
    });

    it("should handle validation errors", (done) => {
      chai
        .request(app)
        .post("/api/v1/tasks")
        .send({
          /* invalid task body */
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message").that.is.a("string");
          done();
        });
    });
  });

  describe("Task Controller - updateTask", () => {
    it("should update a task successfully", (done) => {
      chai
        .request(app)
        .put(`/api/v1/tasks/${validTestId}`)
        .send(mockTaskRequestBody)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body)
            .to.have.property("message")
            .that.equals(TASK_SUCCESSFULLY_UPDATED);
          expect(res.body).to.have.property("data").that.is.an("object");
          expect(res.body.data).to.have.property("id").that.is.a("string");
          expect(res.body.data).to.have.property("title").that.is.a("string");
          expect(res.body.data)
            .to.have.property("description")
            .that.is.a("string");
          expect(res.body.data)
            .to.have.property("completed")
            .that.is.a("boolean");
          expect(res.body.data)
            .to.have.property("created_at")
            .that.is.a("string");
          expect(res.body.data)
            .to.have.property("updated_at")
            .that.is.a("string");
          expect(res.body.data).to.have.property("deleted_at").that.is.null;

          done();
        });
    });

    it("should handle validation errors", (done) => {
      chai
        .request(app)
        .put(`/api/v1/tasks/${validTestId}`)
        .send({
          /* invalid task body */
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message").that.is.a("string");
          done();
        });
    });

    it("should handle task not found", (done) => {
      chai
        .request(app)
        .put(`/api/v1/tasks/${nonValidTestId}`)
        .send(mockTaskRequestBody)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object");
          expect(res.body)
            .to.have.property("message")
            .that.equals(TASK_NOT_FOUND);
          done();
        });
    });
  });

  describe("deleteTask", () => {
    it("should delete a task successfully", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/tasks/${validTestId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body)
            .to.have.property("message")
            .that.equals(TASK_SUCCESSFULLY_DELETED);
          done();
        });
    });

    it("should handle task not found", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/tasks/${nonValidTestId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object");
          expect(res.body)
            .to.have.property("message")
            .that.equals(TASK_NOT_FOUND);
          done();
        });
    });
  });

  describe("notFoundHandler", () => {
    it("should handle not found error", (done) => {
      chai
        .request(app)
        .get("/nonexistent-route")
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message").that.is.a("string");
          expect(res.body.message).to.equal("Not Found - /nonexistent-route");
          done();
        });
    });
  });
});
