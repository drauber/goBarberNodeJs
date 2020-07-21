"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const fromEmailName = process.env.EMAIL_FROM_NAME;
const fromEmail = process.env.EMAIL_FROM;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: fromEmail,
      name: fromEmailName
    }
  }
};
exports.default = _default;