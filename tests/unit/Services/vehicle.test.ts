import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import VehicleService from '../../../src/Services/VehicleService';
import ICar from '../../../src/Interfaces/ICar';
import CustomError from '../../../src/utils/CustomError';

describe('Testes para Vehicle Service', function () {
  it('Deveria cadastrar um novo carro', async function () {
    // Arrange
    const request: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const response = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    Sinon.stub(Model, 'create').resolves(response);

    // Act
    const service = new VehicleService();
    const result = await service.create(request);

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deveria listar todos os carros', async function () {
    // Arrange
    const response = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: false,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    Sinon.stub(Model, 'find').resolves(response);

    // Act
    const service = new VehicleService();
    const result = await service.getAll();

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deveria listar um carro pelo id com sucesso', async function () {
    // Arrange
    const response = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const id = '634852326b35b59438fbea2f';
    Sinon.stub(Model, 'findById').resolves(response);

    // Act
    const service = new VehicleService();
    const result = await service.getById(id);

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deveria não listar um carro com id inválido', async function () {
    // Arrange
    const id = 'X1x111xxx';
    Sinon.stub(Model, 'findById').resolves({});

    // Act
    try {
      const service = new VehicleService();
      await service.getById(id);
    } catch (error) {
    // Assert
      expect((error as CustomError).status).to.be.equal(422);
      expect((error as CustomError).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deveria não listar um carro com id inexistente', async function () {
    // Arrange
    const id = '634852326b35b59438fbea2f';
    Sinon.stub(Model, 'findById').resolves(null);

    // Act
    try {
      const service = new VehicleService();
      await service.getById(id);
    } catch (error) {
    // Assert
      expect((error as CustomError).status).to.be.equal(404);
      expect((error as CustomError).message).to.be.equal('Car not found');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});