import { Request, Response } from "express";
import { taskService } from "../services/tasks.services.js";
import { Status } from "../interfaces/ITask.js";

const createTask = async (req: Request, res: Response) => {
    const newTask = req.body
    const { userId } = req.body
    newTask.status = newTask.status || Status.open
    const task = await taskService.createTask(newTask, userId)
    res.status(201).json(task)

};

const getAllTasks = async (req: Request, res: Response) => {
    const { userId } = req.body
    const tasks = await taskService.getAllTasks(userId)
    res.status(200).json(tasks)

};

const getTaskById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { userId } = req.body
    const task = await taskService.getTaskById(id, userId)
    res.status(200).json(task)

};

const updateTaskById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { userId } = req.body
    const updates = req.body
    const task = await taskService.updateTaskById(id, userId, updates)
    res.status(200).json(task)

};

const deleteTaskById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { userId } = req.body
    await taskService.deleteTaskById(id, userId)
    res.status(200).send()

};


export const taskController = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
}
