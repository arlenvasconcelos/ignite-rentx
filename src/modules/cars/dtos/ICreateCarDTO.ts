import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICreateCarDTO {
  brand: string;
  category_id: string;
  daily_rate: number;
  description: string;
  fine_amount: number;
  license_plate: string;
  name: string;
  specifications?: Specification[];
}
