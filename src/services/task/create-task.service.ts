import { AppDataSource } from '../../database/data-source';
import { Task } from '../../entities/Task';

interface IRequest {
  title: string;
  user_id: string;
}

class CreateTaskService {
  public async execute({ title, user_id }: IRequest): Promise<Task> {
    const taskRepository = AppDataSource.getRepository(Task);

    const task = await taskRepository.save({
      title,
      user_id,
      completed: false,
    });

    return task;
  }
}

export default CreateTaskService;
