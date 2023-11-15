export class TodoAlreadyExistsError extends Error {
  constructor() {
    super('Esta atividade já existe')
  }
}
