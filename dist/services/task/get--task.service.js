"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dataSource = require("../../database/data-source");
var _Task = require("../../entities/Task");
class GetTaskService {
  async execute({
    user_id
  }) {
    const taskRepository = _dataSource.AppDataSource.getRepository(_Task.Task);
    const tasks = await taskRepository.find({
      where: {
        user_id
      },
      order: {
        created_at: 'DESC'
      }
    });
    return tasks;
  }
}
var _default = GetTaskService;
exports.default = _default;