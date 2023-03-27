import { AppDataSource } from '../../database/data-source';
import { Task } from '../../entities/Task';

interface IRequest {
  completed?: boolean;
  id: string;
  title?: string;
}

class UpdateTaskService {
  public async execute({ completed, id, title }: IRequest): Promise<void> {
    const taskRepository = AppDataSource.getRepository(Task);

    await taskRepository
      .createQueryBuilder()
      .update()
      .set({
        completed,
        title,
      })
      .where('id = :id', { id })
      .execute();
  }
}

export default UpdateTaskService;
