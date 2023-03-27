"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../config/auth"));
var _createTask = _interopRequireDefault(require("../services/task/create-task.service"));
var _deleteTask = _interopRequireDefault(require("../services/task/delete-task.service"));
var _getTask = _interopRequireDefault(require("../services/task/get--task.service"));
var _searchTask = _interopRequireDefault(require("../services/task/search-task.service"));
var _updateTask = _interopRequireDefault(require("../services/task/update-task.service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createTaskService = new _createTask.default();
const deleteTaskService = new _deleteTask.default();
const getTaskService = new _getTask.default();
const searchTaskService = new _searchTask.default();
const updateTaskService = new _updateTask.default();
class UserController {
  async create(request, response) {
    try {
      const {
        title,
        user_id
      } = request.body;
      const task = await createTaskService.execute({
        title,
        user_id
      });
      return response.json({
        task
      });
    } catch (error) {
      console.log(error.message);
      return response.status(error.statusCode).send({
        error: error.message
      });
    }
  }
  async update(request, response) {
    try {
      const {
        completed,
        id,
        title
      } = request.body;
      const task = await updateTaskService.execute({
        completed,
        id,
        title
      });
      return response.status(200).send('Task updated successfully');
    } catch (error) {
      return response.status(error.statusCode).send({
        error: error.message
      });
    }
  }
  async delete(request, response) {
    try {
      const {
        id
      } = request.query;
      const task = await deleteTaskService.execute({
        id: String(id)
      });
      return response.status(200).send('Task deleted successfully');
    } catch (error) {
      console.log('error', error.message);
      return response.status(error.statusCode).send({
        error: error.message
      });
    }
  }
  async getAll(request, response) {
    try {
      const authHeader = request.headers.authorization.split(' ')[1];
      const {
        id
      } = (0, _jsonwebtoken.verify)(authHeader, _auth.default.jwt.secret);
      const tasks = await getTaskService.execute({
        user_id: id
      });
      return response.status(200).send(tasks);
    } catch (error) {
      return response.status(error.statusCode).send({
        error: error.message
      });
    }
  }
  async searchByTitle(request, response) {
    try {
      const {
        title
      } = request.query;
      const authHeader = request.headers.authorization.split(' ')[1];
      const {
        id
      } = (0, _jsonwebtoken.verify)(authHeader, _auth.default.jwt.secret);
      const tasks = await searchTaskService.execute({
        title: title,
        user_id: id
      });
      return response.status(200).send(tasks);
    } catch (error) {
      return response.status(error.statusCode).send({
        error: error.message
      });
    }
  }
}
exports.default = UserController;