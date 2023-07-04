import { ErrorTypes, errorCatalog } from "../errors/errorCatalog.js";
import { userHelpers } from "../helpers/users.helpers.js";
import { IUserRequest, IUserUpdateRequest } from "../interfaces/IUser.js";
import { userModel } from "../models/users.models.js";
import * as bcrypt from "bcrypt"


const createUser = async (user) => {
    if (!user.name) {
        throw new Error(ErrorTypes.NameRequired)
    }

    if (!user.email) {
        throw new Error(ErrorTypes.EmailRequired)
    }

    const exist = await userModel.getUserByEmail(user.email)
    if (exist) {
        throw new Error(ErrorTypes.DuplicateEmail)
    }

    if (!user.password) {
        throw new Error(ErrorTypes.PasswordRequired)
    }

    if (!user.active) {
        throw new Error()
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser: IUserRequest = {
        name: user.name,
        email: user.email,
        active: user.active,
        password: hashedPassword
    }

    try {
        const user = await userModel.createUser(newUser)
        return userHelpers.formatUserResponse(user)
    } catch (error) {
        throw new Error()
    }

};

// Get all users
const getAllUsers = async () => {
    try {
        const users = await userModel.getAllUsers()
        return users
    } catch (error) {
        throw new Error()
    }
};

// Get a user by ID
const getUserById = async (id: number) => {

    const user = await userModel.getUserById(id)

    if (!user) {
        throw new Error(ErrorTypes.NotFound)
    }

    return userHelpers.formatUserResponse(user)

};


// Update a user by ID
const updateUserById = async (id: number, updates: IUserUpdateRequest) => {
    if (Object.keys(updates).length) {
        throw new Error(ErrorTypes.EmptyRequest)
    }

    const user = await getUserById(id)
    if (!user) {
        throw new Error(ErrorTypes.NotFound)
    }

    try {
        const user = await userModel.updateUserById(id, updates)
        return userHelpers.formatUserResponse(user)
    } catch (error) {
        throw new Error()
    }

};

// Delete a user by ID
const deleteUserById = async (id: number) => {

    const user = await getUserById(id)
    if (!user) {
        throw new Error(ErrorTypes.NotFound)
    }

    try {
        await userModel.deleteUserById(id)
    } catch (error) {
        throw new Error()
    }
};

export const userService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}
