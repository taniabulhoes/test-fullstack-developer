"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dataSource = require("../../database/data-source");
var _Task = require("../../entities/Task");
class CreateTaskService {
  async execute({
    title,
    user_id
  }) {
    const taskRepository = _dataSource.AppDataSource.getRepository(_Task.Task);
    const task = await taskRepository.save({
      title,
      user_id,
      completed: false
    });
    return task;
  }
}
var _default = CreateTaskService;
exports.default = _default;