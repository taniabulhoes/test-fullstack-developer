export interface CreateTodoInput {
  id?: string,
  subject: string,
  expected_date: Date,
  user_id: string,
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
}

export interface ITodosRepository {
  findById(id: string): Promise<Todo | null>,
  findBySubject(todo: string): Promise<Todo | null>
  list(userId: string, page: number, query?: string): Promise<Todo[]>
  create(data: CreateTodoInput): Promise<Todo>,
  update(data: UpdateTodoInput): Promise<Todo>
  delete(data: DeleteTodoInput): Promise<null>
}