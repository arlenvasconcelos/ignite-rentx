import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCase/devolutionRental/DevolutionRentalController";
import { ListRentalsController } from "@modules/rentals/useCase/listRentals/ListRentalsController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsController = new ListRentalsController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  "/devolution/:rental_id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalsRoutes.get("/", ensureAuthenticated, listRentalsController.handle);

export { rentalsRoutes };
