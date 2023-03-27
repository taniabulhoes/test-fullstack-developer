import { AppDataSource } from '../../database/data-source';
import { Task } from '../../entities/Task';

interface IRequest {
  user_id: string;
}

class GetTaskService {
  public async execute({ user_id }: IRequest): Promise<Task[]> {
    const taskRepository = AppDataSource.getRepository(Task);

    const tasks = await taskRepository.find({
      where: {
        user_id,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return tasks;
  }
}

export default GetTaskService;
