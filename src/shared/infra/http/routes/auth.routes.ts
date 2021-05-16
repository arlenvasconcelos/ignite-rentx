import { AuthenticateUserController } from "@modules/users/useCase/authenticateUser/AuthenticateUserController";
import { Router } from "express";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/", authenticateUserController.handle);

export { authRoutes };
