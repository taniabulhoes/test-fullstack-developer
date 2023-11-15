export class TodoNotExists extends Error {
  constructor() {
    super('Todo not exists')
  }
}
