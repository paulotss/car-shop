import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import CustomError from '../../../src/utils/CustomError';

describe('Testes para Motorcycle Service', function () {
  it('Deveria cadastrar um novo motorcycle', async function () {
    // Arrange
    const request: IMotorcycle = {
      model: 'Honda Cb 600f1 Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const response = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f1 Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    Sinon.stub(Model, 'create').resolves(response);

    // Act
    const service = new MotorcycleService();
    const result = await service.create(request);

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deveria listar todos os motorcycles', async function () {
    // Arrange
    const response = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f2 Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    Sinon.stub(Model, 'find').resolves(response);

    // Act
    const service = new MotorcycleService();
    const result = await service.getAll();

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deveria listar um motorcycle pelo id com sucesso', async function () {
    // Arrange
    const response = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f3 Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const id = '6348513f34c397abcad040b2';
    Sinon.stub(Model, 'findById').resolves(response);

    // Act
    const service = new MotorcycleService();
    const result = await service.getById(id);

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deveria não listar um motorcycle com id inválido', async function () {
    // Arrange
    const id = 'X1x111xxx';
    Sinon.stub(Model, 'findById').resolves({});

    // Act
    try {
      const service = new MotorcycleService();
      await service.getById(id);
    } catch (error) {
    // Assert
      expect((error as CustomError).status).to.be.equal(422);
      expect((error as CustomError).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deveria não listar um motorcycle com id inexistente', async function () {
    // Arrange
    const id = '6348513f34c397abcad040b2';
    Sinon.stub(Model, 'findById').resolves(null);

    // Act
    try {
      const service = new MotorcycleService();
      await service.getById(id);
    } catch (error) {
    // Assert
      expect((error as CustomError).status).to.be.equal(404);
      expect((error as CustomError).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Deveria atualizar um motorcycle por id', async function () {
    // Arrange
    const id = '634852326b35b59438fbea2f';
    const request = {
      model: 'Honda Cb 600f4 Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const response = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f4 Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    Sinon.stub(Model, 'updateOne').resolves(undefined);
    Sinon.stub(Model, 'findById').resolves(response);

    // Act
    const service = new MotorcycleService();
    const result = await service.update(request, id);

    expect(result).to.be.deep.equal(response);
  });

  it('Deveria não atualizar um motorcycle por id inválido', async function () {
    // Arrange
    const id = 'X1x111xxx';
    const request = {
      model: 'Honda Cb 600f5 Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    Sinon.stub(Model, 'updateOne').resolves(undefined);
    Sinon.stub(Model, 'findById').resolves(null);

    // Act
    try {
      const service = new MotorcycleService();
      await service.update(request, id);
    } catch (error) {
    // Assert
      expect((error as CustomError).status).to.be.equal(422);
      expect((error as CustomError).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deveria não atualizar um carro por id inexistente', async function () {
    // Arrange
    const id = '634852326b35b59438fbea2f';
    const request = {
      model: 'Honda Cb 600f6 Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    Sinon.stub(Model, 'findById').resolves(null);
    Sinon.stub(Model, 'updateOne').resolves(undefined);

    // Act
    try {
      const service = new MotorcycleService();
      await service.update(request, id);
    } catch (error) {
    // Assert
      expect((error as CustomError).status).to.be.equal(404);
      expect((error as CustomError).message).to.be.equal('Motorcycle not found');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});