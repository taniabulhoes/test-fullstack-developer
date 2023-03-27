import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import CreateTaskService from '../services/task/create-task.service';
import DeleteTaskService from '../services/task/delete-task.service';
import GetTaskService from '../services/task/get--task.service';
import SearchTaskService from '../services/task/search-task.service';
import UpdateTaskService from '../services/task/update-task.service';

const createTaskService = new CreateTaskService();
const deleteTaskService = new DeleteTaskService();
const getTaskService = new GetTaskService();
const searchTaskService = new SearchTaskService();
const updateTaskService = new UpdateTaskService();

interface IJwtPayload {
  id: string;
}

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { title, user_id } = request.body;

      const task = await createTaskService.execute({ title, user_id });

      return response.json({ task });
    } catch (error) {
      console.log(error.message);

      return response.status(error.statusCode).send({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { completed, id, title } = request.body;

      const task = await updateTaskService.execute({ completed, id, title });

      return response.status(200).send('Task updated successfully');
    } catch (error) {
      return response.status(error.statusCode).send({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.query;

      const task = await deleteTaskService.execute({ id: String(id) });

      return response.status(200).send('Task deleted successfully');
    } catch (error) {
      console.log('error', error.message);
      return response.status(error.statusCode).send({ error: error.message });
    }
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const authHeader = request.headers.authorization.split(' ')[1];
      const { id } = verify(authHeader, authConfig.jwt.secret) as IJwtPayload;

      const tasks = await getTaskService.execute({ user_id: id });

      return response.status(200).send(tasks);
    } catch (error) {
      return response.status(error.statusCode).send({ error: error.message });
    }
  }

  public async searchByTitle(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { title } = request.query;

      const authHeader = request.headers.authorization.split(' ')[1];
      const { id } = verify(authHeader, authConfig.jwt.secret) as IJwtPayload;

      const tasks = await searchTaskService.execute({
        title: title as string,
        user_id: id,
      });

      return response.status(200).send(tasks);
    } catch (error) {
      return response.status(error.statusCode).send({ error: error.message });
    }
  }
}
