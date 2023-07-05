import { ITaskUpdateRequest } from "../interfaces/ITask.js"

const formatTaskPayload = (updates) => {
    const payload: ITaskUpdateRequest = {}
    if (updates.title) {
        payload.title = updates.title
    }

    if (updates.status) {
        payload.status = updates.status
    }

    if (updates.description) {
        payload.description = updates.description
    }

    return payload
}

export const taskHelpers = {
    formatTaskPayload
}