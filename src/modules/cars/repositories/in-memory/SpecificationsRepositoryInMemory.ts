import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  async list(): Promise<Specification[]> {
    const all = await this.specifications;

    return all;
  }
}

export { SpecificationsRepository };
