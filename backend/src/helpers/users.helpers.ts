import { IUser, IUserResponse } from "../interfaces/IUser.js"

const formatUserResponse = (user: IUser): IUserResponse => {
    const formatedUser: IUserResponse = {
        name: user.name,
        active: user.active,
        email: user.email,
        id: user.id
    }

    return formatedUser
}

export const userHelpers = {
    formatUserResponse
}