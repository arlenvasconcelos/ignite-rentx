import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateSpecificationDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.categories.find((item) => item.name === name);

    return category;
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const all = this.categories;

    return all;
  }
}

export { CategoriesRepository };
