import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

const dayPlusOneDay = dayjs().add(1, "day").toDate();

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: dayPlusOneDay,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: dayPlusOneDay,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "12345",
        expected_return_date: dayPlusOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: dayPlusOneDay,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1234",
        expected_return_date: dayPlusOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return_date", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1234",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Min hour not satisfied"));
  });
});
