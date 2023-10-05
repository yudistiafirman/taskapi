// src/controllers/TaskController.ts

import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { validationResult } from "express-validator";

const taskService = new TaskService();

export class TaskController {
  /**
   * Get a list of all tasks.
   * @param req - Express request object
   * @param res - Express response object
   */
  async getAllTasks(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const sortBy = req.query.sortBy as string; // Get sorting field from query parameter
    const sortOrder = req.query.sortOrder as string; // Get sorting order from query parameter

    const completed = req.query.completed === "true"; // Convert string to boolean

    try {
      const tasks = await taskService.getAllTasks(
        page,
        pageSize,
        sortBy,
        sortOrder,
        completed
      );
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * Create a new task.
   * @param req - Express request object
   * @param res - Express response object
   */
  async createTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, completed } = req.body;
    try {
      const task = await taskService.createTask(title, description, completed);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Get a specific task by ID.
   * @param req - Express request object with task ID in params
   * @param res - Express response object
   */
  async getTaskById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const task = await taskService.getTaskById(id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Update a task by ID.
   * @param req - Express request object with task ID in params and updated data in body
   * @param res - Express response object
   */
  async updateTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const updatedTask = req.body;
    try {
      const task = await taskService.updateTask(id, updatedTask);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Delete a task by ID.
   * @param req - Express request object with task ID in params
   * @param res - Express response object
   */
  async deleteTask(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await taskService.deleteTask(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
