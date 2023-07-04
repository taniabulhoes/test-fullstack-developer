import { createSlice } from "@reduxjs/toolkit";
import { IUserSliceinitialState } from "@/interfaces/IUser";
import { loginUser } from "./loginActions";
import { ILoginSliceinitialState } from "@/interfaces/ILogin";

const initialState: ILoginSliceinitialState = {
    loading: false,
    userToken: "",
    error: null,
    success: false,
}



const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setLoggedUser(state, action) {
            state = action.payload
        },
        setToInitalState(state, action) {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            if (payload.token) {
                state.userToken = payload.token
            }
            window.localStorage.setItem(`@TBTD:LoginData`, JSON.stringify(state))
        })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
    },
});

export const { setLoggedUser, setToInitalState } = loginSlice.actions
export default loginSlice.reducer