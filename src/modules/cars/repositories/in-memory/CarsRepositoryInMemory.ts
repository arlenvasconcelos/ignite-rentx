import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[];

  constructor() {
    this.cars = [];
  }

  async findByName(name: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.name === name);
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id === id);
  }
  async create(data: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);
  }
  async list(): Promise<Car[]> {
    return this.cars;
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    this.cars.map((car) => {
      if (car.id === id) Object.assign(car, { available });
      return car;
    });
  }
}

export { CarsRepositoryInMemory };
