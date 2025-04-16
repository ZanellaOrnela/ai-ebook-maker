import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Obtener todos los usuarios
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener usuarios", error });
    }
  }

  // Obtener un usuario por ID
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener usuario", error });
    }
  }

  // Crear un nuevo usuario
  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Error al crear usuario", error });
    }
  }

  // Actualizar un usuario
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.userService.updateUser(id, userData);
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar usuario", error });
    }
  }

  // Eliminar un usuario
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar usuario", error });
    }
  }
} 