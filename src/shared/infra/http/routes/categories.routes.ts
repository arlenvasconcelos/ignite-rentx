import { CreateCategoryController } from "@modules/cars/useCase/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCase/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCase/listCategories/ListCategoriesController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);
export { categoriesRoutes };
