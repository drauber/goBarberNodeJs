"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _INotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/INotificationsRepository"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateAppointmentService {
  constructor(appointmentsRepository, usersRepository, notificationsRepository, cacheProvider) {
    this.appointmentsRepository = appointmentsRepository;
    this.usersRepository = usersRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    date,
    provider_id,
    user_id
  }) {
    const appointmentDate = (0, _dateFns.startOfHour)(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

    if (user_id === provider_id) {
      throw new _AppError.default("You can't create an appointment with youself");
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 17) {
      throw new _AppError.default('You only create appointment between 8:00h and 17:00h');
    }

    if (findAppointmentInSameDate) {
      throw new _AppError.default('This appointment is already booked');
    }

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      throw new _AppError.default('Cannot book on earlier date than now!');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id
    });
    const dateFormatted = (0, _dateFns.format)(appointmentDate, "dd/MM/yyyy 'às' HH:mm");
    const client = await this.usersRepository.findById(user_id);
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para ${dateFormatted}h, cliente ${client === null || client === void 0 ? void 0 : client.name}`
    });
    await this.cacheProvider.invalidade(`provider-appoitments:${provider_id}:${(0, _dateFns.format)(appointmentDate, 'yyyy-M-d')}`);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentService;
exports.default = _default;