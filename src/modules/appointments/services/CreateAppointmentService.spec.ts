import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentRepository = new CreateAppointmentService(
      fakeAppointmentRepository
    );
    const appointment = await createAppointmentRepository.execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentRepository = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appointmentDate = new Date();
    await createAppointmentRepository.execute({
      date: appointmentDate,
      provider_id: '123',
    });

    expect(
      createAppointmentRepository.execute({
        date: appointmentDate,
        provider_id: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
