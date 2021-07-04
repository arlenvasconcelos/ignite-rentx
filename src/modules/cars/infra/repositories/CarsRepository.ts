import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";

import { Car } from "../typeorm/entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async findByName(name: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ name });

    return car;
  }
  async create(data: ICreateCarDTO): Promise<void> {
    const car = this.repository.create(data);

    await this.repository.save(car);
  }

  async list(): Promise<Car[]> {
    const cars = await this.repository.find();

    return cars;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
