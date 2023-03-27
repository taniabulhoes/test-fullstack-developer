"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dataSource = require("../../database/data-source");
var _Task = require("../../entities/Task");
class UpdateTaskService {
  async execute({
    completed,
    id,
    title
  }) {
    const taskRepository = _dataSource.AppDataSource.getRepository(_Task.Task);
    await taskRepository.createQueryBuilder().update().set({
      completed,
      title
    }).where('id = :id', {
      id
    }).execute();
  }
}
var _default = UpdateTaskService;
exports.default = _default;