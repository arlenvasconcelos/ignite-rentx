import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) {}

  async execute({ license_plate, ...rest }: ICreateCarDTO): Promise<void> {
    const carAlreadyExists = await this.carRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    await this.carRepository.create({ license_plate, ...rest });
  }
}

export { CreateCarUseCase };
