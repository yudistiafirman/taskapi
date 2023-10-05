const { TaskController } = require("../../src/controllers/TaskController");
const { expect } = require("chai");

const taskController = new TaskController();

describe("Task Controller", () => {
  let resMock;

  beforeEach(() => {
    // Mocking response object
    resMock = {
      json: function (data) {
        this.result = data;
      },
      status: function (code) {
        this.statusCode = code;
        return this;
      },
    };
  });

  it("should get all tasks", async () => {
    const reqMock = {
      query: {},
    };

    await taskController.getAllTasks(reqMock, resMock);

    // Ensure that json function is called
    expect(resMock.json).to.have.been.calledOnce;
    // Ensure status code is set to 200
    expect(resMock.statusCode).to.equal(200);
    // Ensure result is an array
    expect(resMock.result).to.be.an("array");
  });

  it("should create a task", async () => {
    const reqMock = {
      body: {
        title: "New Task",
        description: "Description",
        completed: false,
      },
    };

    await taskController.createTask(reqMock, resMock);

    // Ensure that json function is called
    expect(resMock.json).to.have.been.calledOnce;
    // Ensure status code is set to 201
    expect(resMock.statusCode).to.equal(201);
    // Ensure result is an object with correct properties
    expect(resMock.result).to.be.an("object");
    expect(resMock.result.title).to.equal("New Task");
    expect(resMock.result.description).to.equal("Description");
    expect(resMock.result.completed).to.equal(false);
  });

  it("should get a task by ID", async () => {
    const reqMock = {
      params: { id: "known-task-id" }, // Replace with actual task ID
    };

    await taskController.getTaskById(reqMock, resMock);

    // Ensure that json function is called
    expect(resMock.json).to.have.been.calledOnce;
    // Ensure result is an object
    expect(resMock.result).to.be.an("object");
    // Ensure status code is set to 200
    expect(resMock.statusCode).to.equal(200);
  });

  it("should return 404 when task does not exist", async () => {
    const reqMock = {
      params: { id: "non-existent-task-id" }, // Replace with non-existent task ID
    };

    await taskController.getTaskById(reqMock, resMock);

    // Ensure status code is set to 404
    expect(resMock.statusCode).to.equal(404);
  });

  it("should update a task", async () => {
    const reqMock = {
      params: { id: "known-task-id" }, // Replace with actual task ID
      body: {
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
      },
    };

    await taskController.updateTask(reqMock, resMock);

    // Ensure that json function is called
    expect(resMock.json).to.have.been.calledOnce;
    // Ensure result is an object
    expect(resMock.result).to.be.an("object");
    // Ensure status code is set to 200
    expect(resMock.statusCode).to.equal(200);
    // Ensure result has updated properties
    expect(resMock.result.title).to.equal("Updated Task");
    expect(resMock.result.description).to.equal("Updated Description");
    expect(resMock.result.completed).to.equal(true);
  });

  it("should return 404 when updating non-existent task", async () => {
    const reqMock = {
      params: { id: "non-existent-task-id" }, // Replace with non-existent task ID
      body: {
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
      },
    };

    await taskController.updateTask(reqMock, resMock);

    // Ensure status code is set to 404
    expect(resMock.statusCode).to.equal(404);
  });

  it("should delete a task", async () => {
    const reqMock = {
      params: { id: "known-task-id" }, // Replace with actual task ID
    };

    await taskController.deleteTask(reqMock, resMock);

    // Ensure that json function is called
    expect(resMock.json).to.have.been.calledOnce;
    // Ensure status code is set to 200
    expect(resMock.statusCode).to.equal(200);
  });

  it("should return 404 when deleting non-existent task", async () => {
    const reqMock = {
      params: { id: "non-existent-task-id" }, // Replace with non-existent task ID
    };

    await taskController.deleteTask(reqMock, resMock);

    // Ensure status code is set to 404
    expect(resMock.statusCode).to.equal(404);
  });
});
