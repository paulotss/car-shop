import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import CustomError from '../../../src/utils/CustomError';

describe('Testes para Car Service', function () {
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
    const service = new CarService();
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
    const service = new CarService();
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
    const service = new CarService();
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
      const service = new CarService();
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
      const service = new CarService();
      await service.getById(id);
    } catch (error) {
    // Assert
      expect((error as CustomError).status).to.be.equal(404);
      expect((error as CustomError).message).to.be.equal('Car not found');
    }
  });

  it('Deveria atualizar um carro por id', async function () {
    // Arrange
    const id = '634852326b35b59438fbea2f';
    const request = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
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
    Sinon.stub(Model, 'updateOne').resolves(undefined);
    Sinon.stub(Model, 'findById').resolves(response);

    // Act
    const service = new CarService();
    const result = await service.update(request, id);

    expect(result).to.be.deep.equal(response);
  });

  it('Deveria não atualizar um carro por id inválido', async function () {
    // Arrange
    const id = 'X1x111xxx';
    const request = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    Sinon.stub(Model, 'updateOne').resolves(undefined);
    Sinon.stub(Model, 'findById').resolves(null);

    // Act
    try {
      const service = new CarService();
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
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    Sinon.stub(Model, 'findById').resolves(null);
    Sinon.stub(Model, 'updateOne').resolves(undefined);

    // Act
    try {
      const service = new CarService();
      await service.update(request, id);
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