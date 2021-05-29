import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findByName(name: string): Promise<Car | undefined>;
  findById(id: string): Promise<Car | undefined>;
  create(data: ICreateCarDTO): Promise<void>;
  list(): Promise<Car[]>;
}

export { ICarsRepository, ICreateCarDTO };
