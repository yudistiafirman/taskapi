import {
  TASK_NOT_FOUND,
  TASK_SUCCESSFULLY_CREATED,
  TASK_SUCCESSFULLY_DELETED,
  TASK_SUCCESSFULLY_UPDATED,
} from "../const/message";
import { TaskRequestBody } from "../request/taskRequest";

const { Task } = require("../models");

export class TaskService {
  /**
   * get a paginated list of tasks with optional sorting and filtering.
   *
   * @param page - The page number for pagination (starting from 1).
   * @param pageSize - The number of tasks per page.
   * @param sortBy - The field to sort by (title or created_at) default value is created_at.
   * @param sortOrder - The sorting order (ASC or DESC or optional).
   * @param completed - Filter tasks by completion status (optional).
   * @returns An object containing paginated tasks(id,title,description,completed,created_at,updated_at,deleted_at),total count,current page, the size of each page.
   */
  async getAllTasks(
    page: number,
    pageSize: number,
    sortBy?: string,
    sortOrder?: string,
    completed?: boolean
  ) {
    const offset = (page - 1) * pageSize;

    const options: any = {
      limit: pageSize,
      offset: offset,
      order: sortBy && sortOrder ? [[sortBy, sortOrder]] : [],
    };
    if (completed != undefined) {
      options.where = { completed };
    }

    const tasks = await Task.findAndCountAll(options);

    return {
      totalPage: Math.ceil(tasks.count / pageSize),
      page: Number(page),
      count: tasks.count,
      data: tasks.rows,
    };
  }

  /**
   * Create a new task.
   *
   * @param taskToCreate - Object containing title(required string), description(required string), and completion(optional boolean) status.
   * @returns Created task object.
   */
  async createTask(taskToCreate: TaskRequestBody) {
    const task = await Task.create(taskToCreate);
    return { message: TASK_SUCCESSFULLY_CREATED, data: task };
  }

  /**
   * Get a specific task by ID.
   * @param id - Task ID
   * @returns Single Task object or null if not found
   */
  async getTaskById(id: string) {
    return await Task.findByPk(id);
  }

  /**
   * Update a task by ID.
   * @param id - Task ID
   * @param updatedTask - Updated task data an object containing title(required string), description(required string), and completion(optional boolean) status
   * @returns Updated task object or null if not found
   */
  async updateTask(id: string, updatedTask: TaskRequestBody) {
    const [updatedRowCount, updatedTasks] = await Task.update(updatedTask, {
      where: { id },
      returning: true,
    });
    if (updatedRowCount === 0) {
      throw new Error(TASK_NOT_FOUND);
    }
    return {
      message: TASK_SUCCESSFULLY_UPDATED,
      data: updatedTasks[0],
    };
  }

  /**
   * Delete a task by ID.
   * @param id - Task ID
   * @returns Success message or null if not found
   */
  async deleteTask(id: string) {
    const deletedRowCount = await Task.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      throw new Error(TASK_NOT_FOUND);
    }

    return { message: TASK_SUCCESSFULLY_DELETED };
  }
}
