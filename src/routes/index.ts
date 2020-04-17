import { Router } from 'express';
import appointmentsRouter from './appointements.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
