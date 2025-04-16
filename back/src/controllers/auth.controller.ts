import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      // Validaciones básicas
      if (!email || !password || !name) {
        res.status(400).json({ message: "Todos los campos son requeridos" });
        return;
      }

      const result = await this.authService.registerLocal(email, password, name);
      res.status(201).json(result);
    } catch (error: unknown) {
      console.error("Error en el registro:", error);
      if (error instanceof Error && error.message === "El correo electrónico ya está registrado") {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error al registrar el usuario" });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validaciones básicas
      if (!email || !password) {
        res.status(400).json({ message: "Email y contraseña son requeridos" });
        return;
      }

      const result = await this.authService.loginLocal(email, password);
      res.json(result);
    } catch (error: unknown) {
      console.error("Error en el login:", error);
      if (error instanceof Error && error.message === "Credenciales inválidas") {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error al iniciar sesión" });
      }
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        res.status(400).json({ message: "Token de Google es requerido" });
        return;
      }

      const result = await this.authService.googleLogin(idToken);
      res.json(result);
    } catch (error: unknown) {
      console.error("Error en el login con Google:", error);
      res.status(500).json({ message: "Error al autenticar con Google" });
    }
  }
} 