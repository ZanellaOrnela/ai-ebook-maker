import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User, AuthProvider } from "../entities/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

interface GoogleUserInfo {
  email: string;
  name: string;
  picture?: string;
}

export class AuthService {
  private userRepository: Repository<User>;
  private googleClient: OAuth2Client;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async registerLocal(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      auth_provider: AuthProvider.EMAIL,
    });

    await this.userRepository.save(user);

    // Generar token
    const token = this.generateToken(user);

    return { user, token };
  }

  async loginLocal(email: string, password: string): Promise<{ user: User; token: string }> {
    // Buscar usuario
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password || "");
    if (!isValidPassword) {
      throw new Error("Credenciales inválidas");
    }

    // Generar token
    const token = this.generateToken(user);

    return { user, token };
  }

  async googleLogin(idToken: string): Promise<{ user: User; token: string }> {
    try {
      // Verificar el token de Google
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error("Token de Google inválido");
      }

      const googleUserInfo: GoogleUserInfo = {
        email: payload.email!,
        name: payload.name!,
        picture: payload.picture,
      };

      // Buscar o crear usuario
      let user = await this.userRepository.findOne({ where: { email: googleUserInfo.email } });

      if (!user) {
        // Crear nuevo usuario
        user = this.userRepository.create({
          email: googleUserInfo.email,
          name: googleUserInfo.name,
          profile_picture: googleUserInfo.picture,
          auth_provider: AuthProvider.GOOGLE,
        });
        await this.userRepository.save(user);
      } else if (user.auth_provider !== AuthProvider.GOOGLE) {
        throw new Error("Este correo ya está registrado con otro método de autenticación");
      }

      // Generar token
      const token = this.generateToken(user);

      return { user, token };
    } catch (error) {
      throw new Error("Error al autenticar con Google: " + (error as Error).message);
    }
  }

  private generateToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || "tu-secreto-seguro", {
      expiresIn: "24h",
    });
  }

  async validateToken(token: string): Promise<User> {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "tu-secreto-seguro") as TokenPayload;
      const user = await this.userRepository.findOne({ where: { id: payload.userId } });
      
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return user;
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
} 