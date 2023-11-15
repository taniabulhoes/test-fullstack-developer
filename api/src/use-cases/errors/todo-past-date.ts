export class TodoPastDateError extends Error {
  constructor() {
    super('A data prevista deve ser maior que a data atual')
  }
}

