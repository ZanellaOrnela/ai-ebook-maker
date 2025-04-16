import { Router } from "express";
import userRoutes from "./user.routes";
import ebookRoutes from "./ebook.routes";
import authRoutes from "./auth.routes";
import aiRoutes from "./ai.routes";
import { AuthMiddleware } from "../middlewares/auth.middleware";
// import usersRouter from "./users.router";
// import ordersRouter from "./orders.router";
// import productsRouter from "./products.router";

const router = Router();
const authMiddleware = new AuthMiddleware();

// Rutas públicas
router.use("/auth", authRoutes);

// Rutas protegidas
router.use("/users", authMiddleware.authenticate, userRoutes);
router.use("/ebooks", authMiddleware.authenticate, ebookRoutes);
router.use("/ai", authMiddleware.authenticate, aiRoutes);

// router.use("/users", usersRouter);
// router.use("/orders", ordersRouter);
// router.use("/products", productsRouter);

export default router;