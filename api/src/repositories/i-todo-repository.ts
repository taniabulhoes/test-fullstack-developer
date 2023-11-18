export interface CreateTodoInput {
  id?: string,
  subject: string,
  expected_date: Date,
  user_id: string,
  checked?: number
}

export interface UpdateTodoInput {
  id: string,
  subject: string,
  expected_date: Date,
  user_id: string,
}

export interface DeleteTodoInput {
  id: string,
  user_id: string,
}

export interface Todo{
  id: string,
  subject: string,
  expected_date: Date,
  user_id: string,
  checked?: number
}

export interface Metrics{
  total_conclude: number,
  total_todos: number
}

export interface ITodosRepository {
  findById(id: string): Promise<Todo | null>,
  findBySubject(subject: string): Promise<Todo | null>
  list(userId: string, query?: string): Promise<Todo[]>
  metrics(userId: string): Promise<Metrics>
  create(data: CreateTodoInput): Promise<Todo>,
  update(data: UpdateTodoInput): Promise<Todo>
  delete(data: DeleteTodoInput): Promise<null>
  concludeTask(id: string, userId: string, check: number): Promise<null>
}