import { ILoginRequest } from "@/interfaces/ILogin"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const baseURL = 'http://localhost:4000'


export const loginUser = createAsyncThunk(
    'user/login',
    async (user: ILoginRequest, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const token = await axios.post(
                `${baseURL}/login`,
                user,
                config
            )

            return token.data
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