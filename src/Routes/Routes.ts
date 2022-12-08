import { Router } from 'express';
import VehicleController from '../Controllers/VehicleController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new VehicleController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new VehicleController(req, res, next).getAll(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new VehicleController(req, res, next).getById(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new VehicleController(req, res, next).update(),
);

export default routes;