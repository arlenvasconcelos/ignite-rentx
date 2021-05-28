import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/users/useCase/createUser/CreateUserController";
import { ListUsersController } from "@modules/users/useCase/listUsers/ListUsersController";
import { UpdateUserAvatarController } from "@modules/users/useCase/updateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listUsersController = new ListUsersController();

usersRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listUsersController.handle
);
usersRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle
);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
