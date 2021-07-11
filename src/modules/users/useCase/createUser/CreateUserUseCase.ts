import { User } from "@modules/users/infra/typeorm/entities/User";
import { hash } from "bcrypt";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    // const userAlreadyExists = await this.userRepository.findByEmail(email);

    // if (userAlreadyExists) {
    //   throw new AppError("User already exists!");
    // }

    const passwordHash = await hash(password, 8);

    // await this.userRepository.create({
    //   name,
    //   email,
    //   password: passwordHash,
    //   driver_license,
    // });

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "welcomeUser.hbs"
    );

    const variables = {
      name,
    };

    await this.mailProvider.sendEmail(
      email,
      "Seja bem vindo!",
      variables,
      templatePath
    );
  }
}

export { CreateUserUseCase };
