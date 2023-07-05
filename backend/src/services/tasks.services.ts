import { ErrorTypes } from "../errors/errorCatalog.js";
import { taskHelpers } from "../helpers/tasks.helpers.js";
import { ITaskRequest, ITaskUpdateRequest, Status } from "../interfaces/ITask.js";
import { taskModel } from "../models/tasks.models.js";
import { userModel } from "../models/users.models.js";


const createTask = async (task, userId: number) => {
    if (!task.title) {
        throw new Error(ErrorTypes.TitleRequired)
    }

    if (!task.description) {
        throw new Error(ErrorTypes.DescriptionRequired)
    }

    if (!task.status) {
        throw new Error()
    }

    if (!task.userId) {
        throw new Error()
    }

    const user = await userModel.getUserById(userId)
    if (!user) {
        throw new Error(ErrorTypes.NotFound)
    }

    const newTask: ITaskRequest = {
        title: task.title,
        description: task.description,
        status: task.status,
        users_id: task.userId
    }

    try {
        const task = await taskModel.creatTask(newTask)
        return task
    } catch (error) {
        throw new Error()
    }

};

const getAllTasks = async (userId: number) => {
    try {
        const tasks = await taskModel.getAllTasks(userId)
        return tasks
    } catch (error) {
        throw new Error()
    }
};

const getTaskById = async (id: number, userId: number) => {

    const task = await taskModel.getTaskById(id)
    if (!task) {
        throw new Error(ErrorTypes.NotFound)
    }

    if (task.users_id != userId) {
        throw new Error(ErrorTypes.NotFound)
    }

    return task
};

const updateTaskById = async (id: number, userId: number, updates: ITaskUpdateRequest) => {
    if (Object.keys(updates).length < 1) {
        throw new Error(ErrorTypes.EmptyRequest)
    }

    const task = await getTaskById(id, userId)
    if (!task) {
        throw new Error(ErrorTypes.NotFound)
    }

    const payload = taskHelpers.formatTaskPayload(updates)

    try {
        const task = await taskModel.updateTaskById(id, payload)
        return task
    } catch (error) {
        throw new Error()
    }
};


const deleteTaskById = async (id: number, userId: number) => {
    const task = await getTaskById(id, userId)
    if (!task) {
        throw new Error(ErrorTypes.NotFound)
    }

    try {
        await taskModel.deleteTaskById(id)
    } catch (error) {
        throw new Error()
    }
};

export const taskService = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
}

