import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDevolutionRentalDTO } from "@modules/rentals/dtos/IDevolutionRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ rental_id, user_id }: IDevolutionRentalDTO): Promise<Rental> {
    const rental = await this.rentalRepository.findById(rental_id);

    if (!rental) throw new AppError("Rental not found");

    if (rental?.user_id !== user_id) throw new AppError("Rental don't ");

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) throw new AppError("Rental doesn't have a car");

    const dateNow = new Date();

    const compare = this.dateProvider.compare(rental.start_date, dateNow);

    const rentalDaysQuantity = Math.ceil(compare / 24);

    rental.total = rentalDaysQuantity * car.fine_amount;
    rental.end_date = dateNow;

    this.carsRepository.updateAvailable(rental.car_id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
