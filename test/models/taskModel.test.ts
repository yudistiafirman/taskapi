import { describe, it } from "node:test";

import { expect } from "chai";
const { Task } = require("../../src/models");

describe("Task Model", () => {
  it("should create a new task", async () => {
    try {
      const task = await Task.create({
        title: "Test Task",
        description: "Description",
        completed: false,
      });

      expect(task.title).to.equal("Test Task");
      expect(task.description).to.equal("Description");
      expect(task.completed).to.equal(false);
    } catch (error) {
      throw error;
    }
  });

  // Add more model tests as needed
});
