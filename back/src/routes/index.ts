import { Router } from "express";
import userRoutes from "./user.routes";
import ebookRoutes from "./ebook.routes";
// import usersRouter from "./users.router";
// import ordersRouter from "./orders.router";
// import productsRouter from "./products.router";

const router = Router();

// Rutas de usuarios
router.use("/users", userRoutes);

// Rutas de ebooks
router.use("/ebooks", ebookRoutes);

// router.use("/users", usersRouter);
// router.use("/orders", ordersRouter);
// router.use("/products", productsRouter);

export default router;