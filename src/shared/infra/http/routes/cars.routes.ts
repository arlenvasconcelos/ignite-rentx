import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCase/listCars/ListCarsController";
import { UploadCarImagesController } from "@modules/cars/useCase/uploadCarImages/UploadCarImagesController";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig.upload("./tmp/cars"));

const carsRoutes = Router();

const listCategoriesController = new ListCarsController();
const createCarController = new CreateCarController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get("/", listCategoriesController.handle);
carsRoutes.post("/", createCarController.handle);
carsRoutes.post(
  "/:id/images",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
