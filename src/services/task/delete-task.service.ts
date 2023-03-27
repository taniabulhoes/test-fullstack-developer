import { AppDataSource } from '../../database/data-source';
import { Task } from '../../entities/Task';

interface IRequest {
  id: string;
}

class DeleteTaskService {
  public async execute({ id }: IRequest): Promise<void> {
    const taskRepository = AppDataSource.getRepository(Task);

    await taskRepository.delete(id);
  }
}

export default DeleteTaskService;
