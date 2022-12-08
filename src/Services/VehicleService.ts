import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CustomError from '../utils/CustomError';

class VehicleService {
  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async update(car: ICar, id: string) {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);
    const carODM = new CarODM();
    await carODM.update(car, id);
    const updatedCar = await carODM.getById(id);
    if (!updatedCar) throw new CustomError('Car not found', 404);
    return this.createCarDomain(updatedCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    const carsDomain: Car[] = [];
    cars.forEach((car: ICar) => {
      carsDomain.push(this.createCarDomain(car));
    });
    return carsDomain;
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    if (!car) throw new CustomError('Car not found', 404);
    return this.createCarDomain(car);
  }
}

export default VehicleService;