import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(401).json({ message: "Token no proporcionado" });
        return;
      }

      const token = authHeader.split(" ")[1]; // Bearer TOKEN
      if (!token) {
        res.status(401).json({ message: "Token no proporcionado" });
        return;
      }

      const user = await this.authService.validateToken(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token inválido" });
    }
  };

  checkRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const user = req.user;

        if (!user) {
          res.status(401).json({ message: "Usuario no autenticado" });
          return;
        }

        if (!roles.includes(user.role)) {
          res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
          return;
        }

        next();
      } catch (error) {
        res.status(401).json({ message: "Error al verificar permisos" });
      }
    };
  };
} 