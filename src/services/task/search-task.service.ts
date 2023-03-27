import { Like } from 'typeorm';
import { AppDataSource } from '../../database/data-source';
import { Task } from '../../entities/Task';

interface IRequest {
  title: string;
  user_id: string;
}

class SearchTaskService {
  public async execute({ title, user_id }: IRequest): Promise<Task[]> {
    const taskRepository = AppDataSource.getRepository(Task);

    const tasks = await taskRepository
      .createQueryBuilder()
      .where('LOWER(title) LIKE :title', { title: `%${title.toLowerCase()}%` })
      .andWhere({ user_id })
      .getMany();

    return tasks;
  }
}

export default SearchTaskService;
