"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _session = _interopRequireDefault(require("./session.routes"));
var _user = _interopRequireDefault(require("./user.routes"));
var _task = _interopRequireDefault(require("./task.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.Router)();
routes.use('/user', _user.default);
routes.use('/session', _session.default);
routes.use('/task', _task.default);
var _default = routes;
exports.default = _default;