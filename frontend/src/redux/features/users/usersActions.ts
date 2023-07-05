import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUserRequest } from '@/interfaces/IUser'

const baseURL = 'http://localhost:4000'


export const registerUser = createAsyncThunk(
    'user/register',
    async (user: IUserRequest, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const data = await axios.post(
                `${baseURL}/users`,
                user,
                config
            )

            return data.data

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

