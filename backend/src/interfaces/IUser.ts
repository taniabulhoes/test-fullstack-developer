export interface IUser {
    name: string
    email: string
    password_hash: string
    active: number
    id: number
}


export interface IUserRequest {
    name: string
    email: string
    password: string
    active: number
}


export interface IUserResponse {
    name: string
    email: string
    active: number
    id: number
}

export interface IUserUpdateRequest {
    name?: string
    email?: string
    password_hash?: string
}
