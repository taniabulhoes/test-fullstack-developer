import { Request, Response } from "express";
import { loginService } from "../services/login.services.js";


// Create a new user
const login = async (req: Request, res: Response) => {
    const userData = req.body
    const token = await loginService.login(userData)
    res.status(200).json(token)

};

export const loginController = {
    login
}