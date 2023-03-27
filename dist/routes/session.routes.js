"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _session = _interopRequireDefault(require("../controllers/session.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersRouter = (0, _express.Router)();
const sessionController = new _session.default();
usersRouter.post('/', sessionController.create);
var _default = usersRouter;
exports.default = _default;