import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
