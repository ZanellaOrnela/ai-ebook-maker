import { Router } from "express";
import { EbookController } from "../controllers/ebook.controller";

const router = Router();
const ebookController = new EbookController();

// Rutas de ebooks
router.get("/", ebookController.getAllEbooks.bind(ebookController));
router.get("/:id", ebookController.getEbookById.bind(ebookController));
router.get("/user/:userId", ebookController.getEbooksByUser.bind(ebookController));
router.post("/", ebookController.createEbook.bind(ebookController));
router.put("/:id", ebookController.updateEbook.bind(ebookController));
router.delete("/:id", ebookController.deleteEbook.bind(ebookController));
router.post("/:id/export", ebookController.exportEbook.bind(ebookController));

export default router; 