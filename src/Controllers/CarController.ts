import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
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

  public async update() {
    const { id } = this.req.params;
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const updatedCar = await this.service.update(car, id);
      this.res.status(200).json(updatedCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const cars = await this.service.getAll();
    this.res.status(200).json(cars);
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getById(id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;