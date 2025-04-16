import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

// Rutas de usuarios
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  userController.getAllUsers(req, res).catch(next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  userController.getUserById(req, res).catch(next);
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  userController.createUser(req, res).catch(next);
});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  userController.updateUser(req, res).catch(next);
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  userController.deleteUser(req, res).catch(next);
});

export default router; 