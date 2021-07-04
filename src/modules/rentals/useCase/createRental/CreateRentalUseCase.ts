import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";

const MIN_INTERVAL = 24; // in hour

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) throw new AppError("Car is unavailable");

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser)
      throw new AppError("There's a rental in progress for user");

    const compare = this.dateProvider.compare(new Date(), expected_return_date);

    if (compare < MIN_INTERVAL) {
      throw new AppError("Min hour not satisfied");
    }

    this.carsRepository.updateAvailable(car_id, false);

    const newRental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return newRental;
  }
}

export { CreateRentalUseCase };
