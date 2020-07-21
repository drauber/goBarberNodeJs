"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async show(request, response) {
    const showProfile = _tsyringe.container.resolve(_ShowProfileService.default);

    const user_id = request.user.id;
    const user = await showProfile.execute({
      user_id
    }); // delete user.password;

    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const user_id = request.user.id;
    const {
      name,
      email,
      password,
      old_password
    } = request.body;

    const updateProfile = _tsyringe.container.resolve(_UpdateProfileService.default);

    try {
      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password
      });
      delete user.password;
      return response.json((0, _classTransformer.classToClass)(user));
    } catch (err) {
      return response.status(400).json({
        erro: err.message
      });
    }
  }

}

exports.default = ProfileController;