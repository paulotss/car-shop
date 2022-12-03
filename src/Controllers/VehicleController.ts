import { Request, Response, NextFunction } from 'express';
import VehicleService from '../Services/VehicleService';
import ICar from '../Interfaces/ICar';

class VehicleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: VehicleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new VehicleService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    const newCar = await this.service.create(car);
    this.res.status(201).json(newCar);
  }
}

export default VehicleController;