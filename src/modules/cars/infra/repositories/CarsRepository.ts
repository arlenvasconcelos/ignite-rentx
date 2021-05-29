import {
  ICarsRepository,
  ICreateCarDTO,
} from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";

import { Car } from "../typeorm/entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async findByName(name: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ name });

    return car;
  }
  async create({ name, description }: ICreateCarDTO): Promise<void> {
    const car = this.repository.create({ name, description });

    await this.repository.save(car);
  }

  async list(): Promise<Car[]> {
    const cars = await this.repository.find();

    return cars;
  }
}

export { CarsRepository };
