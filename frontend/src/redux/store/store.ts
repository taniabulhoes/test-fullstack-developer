import { configureStore } from '@reduxjs/toolkit'

import userSlice from "../features/users/user"
import taskSlice from "../features/tasks/task"
import loginSlice from "../features/login/login"


export const store = configureStore({
    reducer: {
        user: userSlice,
        task: taskSlice,
        login: loginSlice
    }
})



export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>