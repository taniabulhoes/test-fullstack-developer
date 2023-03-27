"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dataSource = require("../../database/data-source");
var _Task = require("../../entities/Task");
class SearchTaskService {
  async execute({
    title,
    user_id
  }) {
    const taskRepository = _dataSource.AppDataSource.getRepository(_Task.Task);
    const tasks = await taskRepository.createQueryBuilder().where('LOWER(title) LIKE :title', {
      title: `%${title.toLowerCase()}%`
    }).andWhere({
      user_id
    }).getMany();
    return tasks;
  }
}
var _default = SearchTaskService;
exports.default = _default;