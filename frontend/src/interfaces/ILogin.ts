export interface ILoginRequest {
    email: string
    password: string
}

export interface ILoginSliceinitialState {
    loading: boolean
    userToken: string
    error: any
    success: boolean
}
