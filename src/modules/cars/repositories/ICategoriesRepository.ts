import { Category } from "../entities/Category";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateSpecificationDTO };
