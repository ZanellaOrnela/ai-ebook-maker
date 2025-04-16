import { AppDataSource } from "../config/dataSource";
import { User } from "../entities/User";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async updateUser(id: string, userData: Partial<User>) {
    const user = await this.getUserById(id);
    if (!user) return null;

    Object.assign(user, userData);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    if (!user) return false;

    await this.userRepository.remove(user);
    return true;
  }
} 