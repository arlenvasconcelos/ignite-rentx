import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { User } from "../modules/users/entities/User";
import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "340b11de3a4b8f67a3f27d1e10fdb5e7"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exists");
    }

    request.user = user;

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
