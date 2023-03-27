"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = require("bcryptjs");
var _jsonwebtoken = require("jsonwebtoken");
var _User = require("../../entities/User");
var _auth = _interopRequireDefault(require("../../config/auth"));
var _appError = _interopRequireDefault(require("../../utils/error/app-error"));
var _dataSource = require("../../database/data-source");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AuthenticateUserService {
  async execute({
    email,
    password
  }) {
    const userRepository = _dataSource.AppDataSource.getRepository(_User.User);
    const user = await userRepository.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new _appError.default('Incorrect email/password.', 401);
    }
    const passwordMatched = await (0, _bcryptjs.compare)(password, user.password);
    if (!passwordMatched) {
      throw new _appError.default('Incorrect email/password.', 401);
    }
    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({
      id: user.id,
      name: user.name
    }, secret, {
      expiresIn
    });
    delete user.password;
    return {
      user,
      token
    };
  }
}
var _default = AuthenticateUserService;
exports.default = _default;