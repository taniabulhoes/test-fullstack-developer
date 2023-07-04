import { ErrorTypes } from "../errors/errorCatalog.js";
import { ILoginRequest } from "../interfaces/ILogin.js"
import { userModel } from "../models/users.models.js";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secretKey = "jsonwebtoken"

const login = async (userData: ILoginRequest) => {
    if (!userData.password) {
        //error
        console.log("error on !userData.name");
    }

    if (!userData.email) {
        //error
        console.log("error on !userData.email");
    }

    const user = await userModel.getUserByEmail(userData.email)

    if (!user) {
        //error
        console.log("error !user");
    }

    const passwordMatch = await bcrypt.compare(userData.password, user.password_hash)
    console.log(user.password_hash);
    console.log(userData.password);
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