import { Router } from 'express';

import SessionController from '../controllers/session.controller';

const usersRouter = Router();

const sessionController = new SessionController();

usersRouter.post('/', sessionController.create);

export default usersRouter;
