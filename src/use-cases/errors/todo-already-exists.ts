export class TodoAlreadyExistsError extends Error {
  constructor() {
    super('Todo alredy exists')
  }
}
