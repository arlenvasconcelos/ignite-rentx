import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCase/listCars/ListCarsController";
import { Router } from "express";

const carsRoutes = Router();

const listCategoriesController = new ListCarsController();
const createCarController = new CreateCarController();

carsRoutes.get("/", listCategoriesController.handle);
carsRoutes.post("/", createCarController.handle);
export { carsRoutes };
