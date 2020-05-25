import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointmentRepository: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointmentRepository = new CreateAppointmentService(
      fakeAppointmentRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentRepository.execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date();
    await createAppointmentRepository.execute({
      date: appointmentDate,
      provider_id: '123',
    });

    await expect(
      createAppointmentRepository.execute({
        date: appointmentDate,
        provider_id: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
