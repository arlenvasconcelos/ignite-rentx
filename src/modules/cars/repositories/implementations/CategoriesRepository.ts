import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateSpecificationDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });

    return category;
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }
}

export { CategoriesRepository };
