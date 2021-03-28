import { Category } from "../models/Category";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  create({ name, description }: ICreateSpecificationDTO): void;
  list(): Category[];
}

export { ICategoriesRepository, ICreateSpecificationDTO };
