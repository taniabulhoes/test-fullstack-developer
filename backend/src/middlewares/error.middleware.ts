import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ErrorTypes, errorCatalog } from "../errors/errorCatalog.js";


const errorHandlerMiddleware: ErrorRequestHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {

    const messageAsErrorType = error.message as ErrorTypes;

    const mappedError = errorCatalog[messageAsErrorType];

    if (mappedError) {
        const { status, message } = mappedError;
        return res.status(status).json({ error: message });
    }

    return res.status(500).json({ message: 'internal error' });

}

export { errorHandlerMiddleware }