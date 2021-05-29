import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    await createCarSpecificationUseCase.execute({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    return response.status(201).send();
  }
}

export { CreateCarSpecificationController };
