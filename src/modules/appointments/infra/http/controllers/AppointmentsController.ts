import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    // Transformação de dado não deve ser repassada para o service
    // Realizada na validação já..
    // const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );

    const appointment = await createAppointmentService.execute({
      date,
      provider_id,
      user_id,
    });
    return response.json(appointment);
  }
}
