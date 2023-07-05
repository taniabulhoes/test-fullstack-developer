import express from "express";
import { taskController } from "../controllers/tasks.controllers.js";

const router = express.Router()

router.get("/", taskController.getAllTasks)
router.get("/:id", taskController.getTaskById)
router.post("/", taskController.createTask)
router.put("/:id", taskController.updateTaskById)
router.delete("/:id", taskController.deleteTaskById)



export default router