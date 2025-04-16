import { Request, Response } from "express";
import { EbookService } from "../services/ebook.service";
import { UserService } from "../services/user.service";

export class EbookController {
  private ebookService: EbookService;
  private userService: UserService;

  constructor() {
    this.ebookService = new EbookService();
    this.userService = new UserService();
  }

  async getAllEbooks(req: Request, res: Response): Promise<void> {
    try {
      const ebooks = await this.ebookService.getAllEbooks();
      res.json(ebooks);
    } catch (error: unknown) {
      console.error("Error al obtener los ebooks:", error);
      res.status(500).json({ message: "Error al obtener los ebooks" });
    }
  }

  async getEbookById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const ebook = await this.ebookService.getEbookById(id);
      if (!ebook) {
        res.status(404).json({ message: "Ebook no encontrado" });
        return;
      }
      res.json(ebook);
    } catch (error: unknown) {
      console.error("Error al obtener el ebook:", error);
      res.status(500).json({ message: "Error al obtener el ebook" });
    }
  }

  async getEbooksByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const ebooks = await this.ebookService.getEbooksByUser(userId);
      res.json(ebooks);
    } catch (error: unknown) {
      console.error("Error al obtener los ebooks del usuario:", error);
      res.status(500).json({ message: "Error al obtener los ebooks del usuario" });
    }
  }

  async createEbook(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.userId;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      const ebook = await this.ebookService.createEbook(req.body, user);
      res.status(201).json(ebook);
    } catch (error: unknown) {
      console.error("Error al crear el ebook:", error);
      res.status(500).json({ message: "Error al crear el ebook" });
    }
  }

  async updateEbook(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const ebook = await this.ebookService.updateEbook(id, req.body);
      if (!ebook) {
        res.status(404).json({ message: "Ebook no encontrado" });
        return;
      }
      res.json(ebook);
    } catch (error: unknown) {
      console.error("Error al actualizar el ebook:", error);
      res.status(500).json({ message: "Error al actualizar el ebook" });
    }
  }

  async deleteEbook(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const success = await this.ebookService.deleteEbook(id);
      if (!success) {
        res.status(404).json({ message: "Ebook no encontrado" });
        return;
      }
      res.status(204).send();
    } catch (error: unknown) {
      console.error("Error al eliminar el ebook:", error);
      res.status(500).json({ message: "Error al eliminar el ebook" });
    }
  }

  async exportEbook(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const pdfUrl = await this.ebookService.exportEbook(id);
      res.json({ pdfUrl });
    } catch (error: unknown) {
      console.error("Error al exportar el ebook:", error);
      res.status(500).json({ message: "Error al exportar el ebook" });
    }
  }
} 