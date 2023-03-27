import { Router } from 'express';

import sessionRouter from './session.routes';
import userRouter from './user.routes';
import taskRouter from './task.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
routes.use('/task', taskRouter);

export default routes;
