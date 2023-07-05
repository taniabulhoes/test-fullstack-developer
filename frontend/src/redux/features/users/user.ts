import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./usersActions";
import { IUserSliceinitialState } from "@/interfaces/IUser";


const initialState: IUserSliceinitialState = {
    loading: false,
    userInfo: {},
    userToken: {},
    error: null,
    success: false,
}


const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setToInitalState(state, action) {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
            state.userInfo = payload

        })
        builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

    },
});

export const { setToInitalState } = userSlice.actions
export default userSlice.reducer