import { Request, Response } from "express";
import { userService } from "../services/users.services.js";


const createUser = async (req: Request, res: Response) => {
    const newUser = req.body
    newUser.active = 1
    const user = await userService.createUser(newUser)
    res.status(201).json(user)

}

const getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.getAllUsers()
    res.status(200).json(users)

};

const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const user = await userService.getUserById(id)
    res.status(200).json(user)

};


const updateUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const updates = req.body
    const user = await userService.updateUserById(id, updates)
    res.status(200).json(user)

};

const deleteUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    await userService.deleteUserById(id)
    res.status(200).send()

};

export const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}
