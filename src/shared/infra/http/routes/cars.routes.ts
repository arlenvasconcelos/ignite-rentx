import { ListCarsController } from "@modules/cars/useCase/listCars/ListCarsController";
import { Router } from "express";

const carsRoutes = Router();

const listCategoriesController = new ListCarsController();

carsRoutes.get("/", listCategoriesController.handle);
carsRoutes.post("/", listCategoriesController.handle);
export { carsRoutes };
