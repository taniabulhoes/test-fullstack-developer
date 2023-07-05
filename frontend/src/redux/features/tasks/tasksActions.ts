import { IDeleteTaskRequest, IGetAllTasksRequest, ITaskRequest, IUpdateRequest } from "@/interfaces/ITask"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const baseURL = 'http://localhost:4000'


export const createTask = createAsyncThunk(
    'task/create',
    async (task: ITaskRequest, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${task.userToken}`
                },
            }
            const newTask = await axios.post(
                `${baseURL}/tasks`,
                task,
                config
            )

            return newTask.data
        } catch (error) {
            const err = error as any
            if (err.response.data.error) {

                return rejectWithValue(err.response.data.error)
            }
            else if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const getAllTasks = createAsyncThunk(
    'task/getAll',
    async (token: IGetAllTasksRequest, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.userToken}`
                },
            }
            const taskList = await axios.get(
                `${baseURL}/tasks`,
                config
            )

            return taskList.data
        } catch (error) {
            const err = error as any
            if (err.response.data.error) {

                return rejectWithValue(err.response.data.error)
            }
            else if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const deleteTask = createAsyncThunk(
    'task/delete',
    async (task: IDeleteTaskRequest, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${task.userToken}`
                },
            }
            const taskList = await axios.delete(
                `${baseURL}/tasks/${task.taskId}`,
                config
            )

            return
        } catch (error) {
            const err = error as any
            if (err.response.data.error) {

                return rejectWithValue(err.response.data.error)
            }
            else if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const updateTask = createAsyncThunk(
    'task/update',
    async (task: IUpdateRequest, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${task.userToken}`
                },
            }
            const taskList = await axios.put(
                `${baseURL}/tasks/${task.taskId}`,
                task,
                config
            )

            return taskList.data
        } catch (error) {
            const err = error as any
            if (err.response.data.error) {

                return rejectWithValue(err.response.data.error)
            }
            else if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
        }
    }
)