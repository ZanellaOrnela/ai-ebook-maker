import { Router } from 'express';
import { AIController } from '../controllers/ai.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const aiController = new AIController();
const authMiddleware = new AuthMiddleware();

// Rutas protegidas que requieren autenticación
router.use(authMiddleware.authenticate.bind(authMiddleware));

// Generar contenido para un capítulo
router.post('/chapters/:chapterId/prompts/:promptId/generate', async (req, res) => {
  await aiController.generateChapterContent(req, res);
});

// Generar contenido para una sección
router.post('/chapters/:chapterId/sections/:sectionId/prompts/:promptId/generate', async (req, res) => {
  await aiController.generateSectionContent(req, res);
});

export default router; 