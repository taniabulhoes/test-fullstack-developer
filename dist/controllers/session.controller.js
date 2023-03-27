"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _authenticateUser = _interopRequireDefault(require("../services/user/authenticate-user.service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const authenticateUserService = new _authenticateUser.default();
class SessionsController {
  async create(request, response) {
    try {
      const {
        email,
        password
      } = request.body;
      const {
        user,
        token
      } = await authenticateUserService.execute({
        email,
        password
      });
      return response.json({
        user,
        token
      });
    } catch (error) {
      return response.status(error.statusCode).send({
        error: error.message
      });
    }
  }
}
exports.default = SessionsController;