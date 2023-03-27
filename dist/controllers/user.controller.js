"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createUser = _interopRequireDefault(require("../services/user/create-user.service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createUserService = new _createUser.default();
class UserController {
  async create(request, response) {
    try {
      const {
        name,
        email,
        password
      } = request.body;
      const user = await createUserService.execute({
        email,
        name,
        password
      });
      return response.json({
        user
      });
    } catch (error) {
      return response.status(error.statusCode).send({
        error: error.message
      });
    }
  }
}
exports.default = UserController;