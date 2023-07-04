export interface ITaskSliceinitialState {
    loading: boolean
    taskList: ITask[]
    error: any
    success: boolean
    filter: ITaskFilter
    userToken: ""
}

export interface ITaskFilter {
    title: string
    status: string
}

export interface ITaskRequest {
    title: string
    description: string
    status?: string
    userToken: string
}

export interface IGetAllTasksRequest {
    userToken: string
}

export interface IUpdateRequest {
    title?: string
    status?: string
    description?: string
    userToken: string
    taskId: number
}

export interface IDeleteTaskRequest {
    userToken: string
    taskId: number
}

export interface ITask {
    title: string
    description: string
    status: string
    id: number
}


