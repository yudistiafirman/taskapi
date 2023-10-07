// src/controllers/TaskController.ts

import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import {
  CreateTaskResponse,
  GetAllTaskResponse,
} from "../responses/taskResponses";
import {
  GetAllTaskRequestParams,
  TaskRequestBody,
} from "../request/taskRequest";
import { Task } from "../interfaces/taskIntefaces";
import getErrorMessagesFromValidationResult from "../helper/generalFunc";
import { TASK_NOT_FOUND } from "../const/message";

const taskService = new TaskService();

export class TaskController {
  /**
   * Get a list of all tasks.
   *
   * @param req - query parameters object containing :
   * page - the page number for pagination and 1 for default value
   * pageSize - The number of tasks per page and 10 for default value
   * sortby -  - The field to sort by (title or created_at) default value is created_at.
   * sortOrder - The sorting order (ASC or DESC or optional).
   * completed - Filter tasks by completion status (optional).
   * @param res - response object containing paginated tasks(id,title,description,completed,created_at,updated_at,deleted_at),total count,current page, the size of each page.
   * @param next - next function for pass the error to errorhandler as a middleware
   */
  async getAllTasks(
    req: Request<{}, {}, {}, GetAllTaskRequestParams>,
    res: Response<GetAllTaskResponse>,
    next: NextFunction
  ) {
    const {
      page = 1,
      pageSize = 10,
      sortBy = "created_at",
      sortOrder = "DESC",
      completed,
    } = req.query;
    const completedQuery =
      completed === "true" ? true : completed === "false" ? false : undefined;

    try {
      const tasks = await taskService.getAllTasks(
        page,
        pageSize,
        sortBy,
        sortOrder,
        completedQuery
      );
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new task.
   * @param req - request body that contain title(required string), description(required string), and completion(optional boolean) status.
   * @param res - response object that contain a message and data that contain following properties:
   * created_at
   * updated_at
   * id
   * deleted_at
   * title
   * description
   * completed
   */
  async createTask(
    req: Request<{}, {}, TaskRequestBody>,
    res: Response<CreateTaskResponse | { message: string }>,
    next: NextFunction
  ) {
    const validationResultMessage = getErrorMessagesFromValidationResult(req);
    if (validationResultMessage) {
      return res.status(400).json({ message: validationResultMessage[0] });
    }
    try {
      const taskToCreate = req.body;
      const task = await taskService.createTask(taskToCreate);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a specific task by ID.
   * @param req - request object with task ID in params
   * @param res - Express response object contain following properties:
   *  created_at
   * updated_at
   * id
   * deleted_at
   * title
   * description
   * completed
   */
  async getTaskById(
    req: Request<{ id: string }>,
    res: Response<Task | { message: string }>,
    next: NextFunction
  ) {
    const id = req.params.id;
    try {
      const task = await taskService.getTaskById(id);
      if (!task) {
        res.status(404).json({ message: TASK_NOT_FOUND });
      } else {
        res.json(task);
      }
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a task by ID.
   * @param req - request body object with task ID in params and updated data contain title(required string), description(required string), and completion(optional boolean) status in body
   * @param res - response object
   */
  async updateTask(
    req: Request<{ id: string }, {}, TaskRequestBody>,
    res: Response<CreateTaskResponse | { message: string }>,
    next: NextFunction
  ) {
    const validationResultMessage = getErrorMessagesFromValidationResult(req);

    const id = req.params.id;
    const taskToUpdate = req.body;

    if (validationResultMessage) {
      return res.status(400).json({ message: validationResultMessage[0] });
    }

    try {
      const task = await taskService.getTaskById(id);
      if (!task) {
        res.status(404).json({ message: TASK_NOT_FOUND });
      } else {
        const updatedTask = await taskService.updateTask(id, taskToUpdate);
        res.json(updatedTask);
      }
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a task by ID.
   * @param req - request object with task ID in params
   * @param res - response object
   */
  async deleteTask(
    req: Request<{ id: string }>,
    res: Response<{ message: string }>,
    next: NextFunction
  ) {
    const id = req.params.id;

    try {
      const task = await taskService.getTaskById(id);
      if (!task) {
        res.status(404).json({ message: TASK_NOT_FOUND });
      } else {
        const result = await taskService.deleteTask(id);
        res.json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}
