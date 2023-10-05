import { Error } from "sequelize";

const { TaskService } = require("../../src/services/TaskService");
const { Task } = require("../../src/models");
const sinon = require("sinon");
const { expect } = require("chai");

const taskService = new TaskService();

describe("Task Service", () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  after(() => {
    sandbox.restore();
  });

  it("should get all tasks", async () => {
    const findAndCountAllStub = sandbox
      .stub(Task, "findAndCountAll")
      .resolves({ rows: [], count: 0 });

    const result = await taskService.getAllTasks(1, 10);

    expect(findAndCountAllStub.calledOnce).to.be.true;

    expect(result).to.have.property("rows");
    expect(result).to.have.property("count");
  });

  it("should create a task", async () => {
    // Stub the Task model's create function
    const createStub = sandbox.stub(Task, "create").resolves({
      title: "New Task",
      description: "Description",
      completed: false,
    });

    const result = await taskService.createTask(
      "New Task",
      "Description",
      false
    );

    expect(createStub.calledOnce).to.be.true;
    expect(result).to.have.property("title");
    expect(result).to.have.property("description");
    expect(result).to.have.property("completed");
  });

  it("should get a task by ID", async () => {
    const findByPkStub = sandbox.stub(Task, "findByPk").resolves({
      id: "known-task-id",
      title: "Task",
      description: "Description",
      completed: false,
    });

    const result = await taskService.getTaskById("known-task-id");

    expect(findByPkStub.calledOnceWith("known-task-id")).to.be.true;

    expect(result).to.have.property("id");
    expect(result).to.have.property("title");
    expect(result).to.have.property("description");
    expect(result).to.have.property("completed");
  });

  it("should update a task", async () => {
    const updateStub = sandbox.stub(Task, "update").resolves([
      1,
      [
        {
          id: "known-task-id",
          title: "Updated Task",
          description: "Updated Description",
          completed: true,
        },
      ],
    ]);

    const result = await taskService.updateTask("known-task-id", {
      title: "Updated Task",
      description: "Updated Description",
      completed: true,
    });
    expect(
      updateStub.calledOnceWith(
        {
          title: "Updated Task",
          description: "Updated Description",
          completed: true,
        },
        { where: { id: "known-task-id" }, returning: true }
      )
    ).to.be.true;
    expect(result).to.have.property("id");
    expect(result).to.have.property("title");
    expect(result).to.have.property("description");
    expect(result).to.have.property("completed");
  });

  it("should delete a task", async () => {
    const destroyStub = sandbox.stub(Task, "destroy").resolves(1);

    const result = await taskService.deleteTask("known-task-id");

    expect(destroyStub.calledOnceWith({ where: { id: "known-task-id" } })).to.be
      .true;
    expect(result).to.have.property("message");
  });

  it("should throw an error when task does not exist (getTaskById)", async () => {
    const findByPkStub = sandbox.stub(Task, "findByPk").resolves(null);

    try {
      await taskService.getTaskById("non-existent-task-id");
    } catch (error) {
      expect((error as Error).message).to.equal("Task not found");
    }
  });

  it("should throw an error when task does not exist (updateTask)", async () => {
    const updateStub = sandbox.stub(Task, "update").resolves([0, []]);

    try {
      await taskService.updateTask("non-existent-task-id", {
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
      });
    } catch (error) {
      expect((error as Error).message).to.equal("Task not found");
    }
  });

  it("should throw an error when task does not exist (deleteTask)", async () => {
    const destroyStub = sandbox.stub(Task, "destroy").resolves(0);

    try {
      await taskService.deleteTask("non-existent-task-id");
    } catch (error) {
      expect((error as Error).message).to.equal("Task not found");
    }
  });
});
