"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensure-authenticated"));
var _task = _interopRequireDefault(require("../controllers/task.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const taskRouter = (0, _express.Router)();
const taskController = new _task.default();
taskRouter.use(_ensureAuthenticated.default);
taskRouter.post('/', taskController.create);
taskRouter.put('/', taskController.update);
taskRouter.delete('/', taskController.delete);
taskRouter.get('/all', taskController.getAll);
taskRouter.get('/search', taskController.searchByTitle);
var _default = taskRouter;
exports.default = _default;