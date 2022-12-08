import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import CustomError from '../utils/CustomError';

class MotorcycleService {
  private createCarDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createCarDomain(newMotorcycle);
  }

  public async update(motorcycle: IMotorcycle, id: string) {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);
    const motorcycleODM = new MotorcycleODM();
    await motorcycleODM.update(motorcycle, id);
    const updatedMotorcycle = await motorcycleODM.getById(id);
    if (!updatedMotorcycle) throw new CustomError('Motorcycle not found', 404);
    return this.createCarDomain(updatedMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();
    const motorcyclesDomain: Motorcycle[] = [];
    motorcycles.forEach((motorcycle: IMotorcycle) => {
      motorcyclesDomain.push(this.createCarDomain(motorcycle));
    });
    return motorcyclesDomain;
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getById(id);
    if (!motorcycle) throw new CustomError('Motorcycle not found', 404);
    return this.createCarDomain(motorcycle);
  }
}

export default MotorcycleService;