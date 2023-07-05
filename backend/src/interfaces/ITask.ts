export enum Status {
    closed = "closed",
    running = "running",
    open = "open",
}

export interface ITask {
    id: number
    title: string
    status: Status
    description: string
    users_id: number
}


export interface ITaskRequest {
    title: string
    status: Status
    description: string
    users_id: number
}


export interface ITaskResponse {
    id: number
    title: string
    status: Status
    description: number
}

export interface ITaskUpdateRequest {
    title?: string
    status?: Status
    description?: string
}