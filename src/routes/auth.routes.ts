import { Router } from "express";

import { AuthenticateUserController } from "../modules/users/useCase/authenticateUser/AuthenticateUserController";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/", authenticateUserController.handle);

export { authRoutes };
