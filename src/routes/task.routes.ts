import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensure-authenticated';
import TaskController from '../controllers/task.controller';

const taskRouter = Router();

const taskController = new TaskController();

taskRouter.use(ensureAuthenticated);

taskRouter.post('/', taskController.create);

taskRouter.put('/', taskController.update);

taskRouter.delete('/', taskController.delete);

taskRouter.get('/all', taskController.getAll);

taskRouter.get('/search', taskController.searchByTitle);

export default taskRouter;
