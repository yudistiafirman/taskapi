import express, { Router } from "express";
import { TaskController } from "../../controllers/TaskController";
import { validateTask } from "../../middleware/validationHandler";

const router: Router = express.Router();
const taskController = new TaskController();

router.get("/", taskController.getAllTasks.bind(taskController));
router.post("/", validateTask, taskController.createTask.bind(taskController));
router.get("/:id", taskController.getTaskById.bind(taskController));
router.put(
  "/:id",
  validateTask,
  taskController.updateTask.bind(taskController)
);
router.delete("/:id", taskController.deleteTask.bind(taskController));

export default router;
