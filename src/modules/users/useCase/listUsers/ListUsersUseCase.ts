import { User } from "@modules/users/infra/typeorm/entities/User";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.list();

    return users;
  }
}

export { ListUsersUseCase };
