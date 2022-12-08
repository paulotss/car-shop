import { Model, models, model, Schema, SchemaDefinition, SchemaDefinitionType } from 'mongoose';

class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;

  constructor(schema: SchemaDefinition<SchemaDefinitionType<T>>, collection: string) {
    this.schema = new Schema<T>({ ...schema });
    this.model = models[collection] || model(collection, this.schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async update(vehicle: T, id: string) {
    return this.model.updateOne({ _id: id }, { ...vehicle });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
}

export default AbstractODM;