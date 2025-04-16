import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Ebook } from "../entities/Ebook";
import { User } from "../entities/User";

export class EbookService {
  private ebookRepository: Repository<Ebook>;

  constructor() {
    this.ebookRepository = AppDataSource.getRepository(Ebook);
  }

  async getAllEbooks(): Promise<Ebook[]> {
    return this.ebookRepository.find();
  }

  async getEbookById(id: string): Promise<Ebook | null> {
    return this.ebookRepository.findOne({ where: { id } });
  }

  async getEbooksByUser(userId: string): Promise<Ebook[]> {
    return this.ebookRepository.find({ where: { user: { id: userId } } });
  }

  async createEbook(ebookData: Partial<Ebook>, user: User): Promise<Ebook> {
    const ebook = this.ebookRepository.create({
      ...ebookData,
      user,
    });
    return this.ebookRepository.save(ebook);
  }

  async updateEbook(id: string, ebookData: Partial<Ebook>): Promise<Ebook | null> {
    // Extraer solo las propiedades que queremos actualizar
    const { title, description, status, cover_image, language, tags, price, version } = ebookData;
    
    // Crear un objeto con solo las propiedades permitidas
    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (cover_image !== undefined) updateData.cover_image = cover_image;
    if (language !== undefined) updateData.language = language;
    if (tags !== undefined) updateData.tags = tags;
    if (price !== undefined) updateData.price = price;
    if (version !== undefined) updateData.version = version;
    
    await this.ebookRepository.update(id, updateData);
    return this.getEbookById(id);
  }

  async deleteEbook(id: string): Promise<boolean> {
    const result = await this.ebookRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async exportEbook(id: string): Promise<string> {
    const ebook = await this.getEbookById(id);
    if (!ebook) {
      throw new Error("Ebook no encontrado");
    }
    // TODO: Implementar la lógica de exportación
    return `Exportando ebook ${id} en formato PDF`;
  }
} 