import { createSlice } from "@reduxjs/toolkit";
import { ITaskSliceinitialState } from "@/interfaces/ITask";
import { createTask, deleteTask, getAllTasks, updateTask } from "./tasksActions";


const initialState: ITaskSliceinitialState = {
    loading: false,
    taskList: [],
    error: null,
    success: false,
    filter: { title: "", status: " " },
    userToken: ""
}


const taskSlice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        setTaskFilter(state, action) {
            state.filter = action.payload
        },
        setUserToken(state, action) {
            state.userToken = action.payload
        },
        setToInitalState(state, action) {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        //create actions
        builder.addCase(createTask.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(createTask.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true

        })
        builder.addCase(createTask.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        //task list actions
        builder.addCase(getAllTasks.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            if (payload) {
                state.taskList = payload
            }

        })
        builder.addCase(getAllTasks.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        //delete actions
        builder.addCase(deleteTask.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(deleteTask.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        //update actions
        builder.addCase(updateTask.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(updateTask.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(updateTask.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

    },



});
export const { setTaskFilter, setUserToken, setToInitalState } = taskSlice.actions
export default taskSlice.reducer