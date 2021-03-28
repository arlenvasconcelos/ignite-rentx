import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCase/createCategory";
import { listCategoryController } from "../modules/cars/useCase/listCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
});

export { categoriesRoutes };
