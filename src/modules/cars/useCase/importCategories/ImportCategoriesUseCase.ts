import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      stream.pipe(parseFile);

      const categories: IImportCategories[] = [];

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const categoryAlreadyExists = await this.categoryRepository.findByName(
        category.name
      );

      if (!categoryAlreadyExists) {
        await this.categoryRepository.create(category);
      }
    });
  }
}

export { ImportCategoriesUseCase };
