import express from 'express';
import "express-async-errors"
import userRoutes from "./routes/users.routes.js"
import loginRoutes from "./routes/login.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
import { ensureAuthMiddleware } from './middlewares/ensureAuth.middleware.js';
import { errorHandlerMiddleware } from './middlewares/error.middleware.js';
import cors from "cors"

const app = express();


app.use(express.json());
app.use(cors())

app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/tasks", ensureAuthMiddleware, taskRoutes)

app.use(errorHandlerMiddleware)

app.listen(4000, () => {
    console.log(`server running on port 4000`);
});