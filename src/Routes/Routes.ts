import { Router } from 'express';
import VehicleController from '../Controllers/VehicleController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new VehicleController(req, res, next).create(),
);

export default routes;