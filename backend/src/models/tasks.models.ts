import { PrismaClient } from "@prisma/client";
import { ITask, ITaskRequest, Status } from "../interfaces/ITask.js";

const prisma = new PrismaClient();

const creatTask = async (task: ITaskRequest): Promise<ITask> => {
    const newTask = await prisma.tasks.create({
        data: {
            title: task.title,
            description: task.description,
            status: task.status,
            users_id: task.users_id
        }
    })

    return { ...newTask, status: Status[newTask.status] }
}

const getTaskById = async (id) => {
    const task = await prisma.tasks.findUnique({
        where: {
            id,
        },
    });
    return task;
};

const getAllTasks = async (userId) => {
    const tasks = await prisma.tasks.findMany({
        where: {
            users_id: userId
        }
    })

    return tasks;
};

const updateTaskById = async (id, updates): Promise<ITask> => {
    const updatedTask = await prisma.tasks.update({
        where: {
            id,
        },
        data: updates,
    });

    return { ...updatedTask, status: Status[updatedTask.status] }
};


const deleteTaskById = async (id) => {
    const deleteded = await prisma.tasks.delete({
        where: {
            id,
        },
    });
};

export const taskModel = {
    getAllTasks,
    getTaskById,
    creatTask,
    updateTaskById,
    deleteTaskById
}