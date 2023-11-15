export class TodoNotExists extends Error {
  constructor() {
    super('Esta todo list não existe, tente outra')
  }
}
