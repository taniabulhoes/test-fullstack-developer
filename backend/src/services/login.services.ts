import { config } from "../configs/configs.js";
import { ErrorTypes } from "../errors/errorCatalog.js";
import { ILoginRequest } from "../interfaces/ILogin.js"
import { userModel } from "../models/users.models.js";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secretKey = config.JWT_KEY

const login = async (userData: ILoginRequest) => {
    if (!userData.password) {
        throw new Error(ErrorTypes.PasswordRequired)
    }

    if (!userData.email) {
        throw new Error(ErrorTypes.EmailRequired)
    }

    const user = await userModel.getUserByEmail(userData.email)

    if (!user) {
        throw new Error(ErrorTypes.NotFound)
    }

    const passwordMatch = await bcrypt.compare(userData.password, user.password_hash)
    if (!passwordMatch) {
        throw new Error(ErrorTypes.UnauthorizedError)
    }


    const token = jwt.sign({ userId: user.id }, secretKey)
    if (!token) {
        throw new Error(ErrorTypes.JsonWebTokenError)
    }
    return { token: token }

}

export const loginService = {
    login
}