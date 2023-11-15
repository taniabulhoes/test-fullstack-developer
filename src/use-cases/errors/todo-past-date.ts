export class TodoPastDateError extends Error {
  constructor() {
    super('Expected date must be higher than today')
  }
}

