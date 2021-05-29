import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    return this.carsRepository.list();
  }
}

export { ListCarsUseCase };
