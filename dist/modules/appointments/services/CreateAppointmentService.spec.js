"use strict";

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeNotificationsRepository;
let fakeAppointmentRepository;
let createAppointmentRepository;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeAppointmentRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointmentRepository = new _CreateAppointmentService.default(fakeAppointmentRepository, fakeUsersRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointmentRepository.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider-id',
      user_id: 'user-id'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });
  it('should NOT be able to create two appointments on the same time', async () => {
    const appointmentDate = (0, _dateFns.addHours)(new Date(), 2);
    await createAppointmentRepository.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id'
    });
    await expect(createAppointmentRepository.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentRepository.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: 'provider-id',
      user_id: 'user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same use as provider', async () => {
    const appointmentDate = (0, _dateFns.addHours)(new Date(), 2);
    await expect(createAppointmentRepository.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before than 08:00h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentRepository.execute({
      date: new Date(2020, 4, 11, 7),
      provider_id: 'provider-id',
      user_id: 'user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment after than 17:00h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentRepository.execute({
      date: new Date(2020, 4, 11, 18),
      provider_id: 'provider-id',
      user_id: 'user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});