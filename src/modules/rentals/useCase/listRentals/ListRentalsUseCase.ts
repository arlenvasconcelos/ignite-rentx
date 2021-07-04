import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class ListRentalsUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(): Promise<Rental[]> {
    const users = await this.rentalsRepository.list();

    return users;
  }
}

export { ListRentalsUseCase };
