import { CreateSpecificationController } from "@modules/cars/useCase/createSpecification/CreateSpecificationController";
import { Router } from "express";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
