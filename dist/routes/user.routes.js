"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _user = _interopRequireDefault(require("../controllers/user.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRouter = (0, _express.Router)();
const userController = new _user.default();
userRouter.post('/', userController.create);
var _default = userRouter;
exports.default = _default;