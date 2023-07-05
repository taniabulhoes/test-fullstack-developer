import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { userModel } from "../models/users.models.js";
import { ErrorTypes } from "../errors/errorCatalog.js";
import { config } from "../configs/configs.js";

const ensureAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new Error(ErrorTypes.MissingHeader)
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new Error(ErrorTypes.tokenNotFound)
    }

    const secretKey = config.JWT_KEY

    verify(token, secretKey, (err, decoded) => {
        if (!decoded) {

            throw new Error()
        }
        const { userId } = <any>decoded;
        request.body.userId = userId;
    });

    const user = await userModel.getUserById(request.body.userId)
    if (!user) {
        throw new Error(ErrorTypes.NotFound)
    }

    next()
}

export { ensureAuthMiddleware }