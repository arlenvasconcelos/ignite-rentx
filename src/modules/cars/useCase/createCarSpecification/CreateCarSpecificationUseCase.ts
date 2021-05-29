import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository,
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carRepository.findById(car_id);

    if (carExists) {
      throw new AppError("Car doesn't exists!");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications_id;

    await this.carRepository.create({
      license_plate,
      ...rest,
    });
  }
}

export { CreateCarSpecificationUseCase };
