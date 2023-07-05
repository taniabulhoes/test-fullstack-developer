export interface IUserRequest {
    name: string
    email: string
    password: string
}

export interface IUserSliceinitialState {
    loading: boolean
    userInfo: any
    userToken: {}
    error: any
    success: boolean
}

