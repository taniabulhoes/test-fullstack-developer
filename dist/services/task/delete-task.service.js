"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dataSource = require("../../database/data-source");
var _Task = require("../../entities/Task");
class DeleteTaskService {
  async execute({
    id
  }) {
    const taskRepository = _dataSource.AppDataSource.getRepository(_Task.Task);
    await taskRepository.delete(id);
  }
}
var _default = DeleteTaskService;
exports.default = _default;