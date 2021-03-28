import { Category } from "../../models/Category";
import {
  ICategoriesRepository,
  ICreateSpecificationDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoriesRepository();
    }

    return this.INSTANCE;
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const newCategory = new Category();

    Object.assign(newCategory, { name, description });

    this.categories.push(newCategory);
  }

  list(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };
