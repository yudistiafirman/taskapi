// src/services/TaskService.ts

const { Task } = require("../models");

export class TaskService {
  /**
   * Get a list of all tasks with optional pagination, sorting, and filtering.
   * @param page - Page number for pagination
   * @param pageSize - Number of tasks per page
   * @param sortBy - Field to sort by
   * @param sortOrder - Sorting order (ASC or DESC)
   * @param completed - Filter by completed status
   * @returns List of tasks and total count
   */
  async getAllTasks(
    page: number,
    pageSize: number,
    sortBy?: string,
    sortOrder?: string,
    completed?: boolean
  ) {
    try {
      const offset = (page - 1) * pageSize;

      // Build options object for findAll
      const options: any = {
        limit: pageSize,
        offset: offset,
        order: sortBy && sortOrder ? [[sortBy, sortOrder]] : [],
        where: completed !== undefined ? { completed } : {},
      };

      const tasks = await Task.findAndCountAll(options);
      return tasks;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  /**
   * Create a new task.
   * @param title - Task title
   * @param description - Task description
   * @param completed - Completion status
   * @returns Created task object
   */
  async createTask(title: string, description: string, completed: boolean) {
    try {
      return await Task.create({ title, description, completed });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  /**
   * Get a specific task by ID.
   * @param id - Task ID
   * @returns Task object or null if not found
   */
  async getTaskById(id: string) {
    try {
      return await Task.findByPk(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  /**
   * Update a task by ID.
   * @param id - Task ID
   * @param updatedTask - Updated task data
   * @returns Updated task object or null if not found
   */
  async updateTask(id: string, updatedTask: object) {
    try {
      const [updatedRowCount, updatedTasks] = await Task.update(updatedTask, {
        where: { id },
        returning: true,
      });
      if (updatedRowCount > 0) {
        return updatedTasks[0];
      } else {
        throw new Error("Task not found");
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  /**
   * Delete a task by ID.
   * @param id - Task ID
   * @returns Success message or null if not found
   */
  async deleteTask(id: string) {
    try {
      const deletedRowCount = await Task.destroy({
        where: { id },
      });
      if (deletedRowCount > 0) {
        return { message: "Task deleted successfully" };
      } else {
        throw new Error("Task not found");
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
