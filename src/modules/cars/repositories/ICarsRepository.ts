import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findByName(name: string): Promise<Car | undefined>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findById(id: string): Promise<Car | undefined>;
  create(data: ICreateCarDTO): Promise<void>;
  list(): Promise<Car[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
