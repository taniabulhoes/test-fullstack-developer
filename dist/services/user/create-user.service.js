"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = require("bcryptjs");
var _dataSource = require("../../database/data-source");
var _User = require("../../entities/User");
var _appError = _interopRequireDefault(require("../../utils/error/app-error"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateUserService {
  async execute({
    name,
    email,
    password
  }) {
    const usersRepository = _dataSource.AppDataSource.getRepository(_User.User);
    const checkUserExists = await usersRepository.findOne({
      where: {
        email
      }
    });
    if (checkUserExists) {
      throw new _appError.default('Email address already used.');
    }
    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    const user = await usersRepository.save({
      name,
      email,
      password: hashedPassword
    });
    delete user.password;
    return user;
  }
}
var _default = CreateUserService;
exports.default = _default;