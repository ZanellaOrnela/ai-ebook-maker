import { Request, Response } from 'express';
import { AIService } from '../services/ai.service';
import { AppDataSource } from '../data-source';
import { Prompt } from '../entities/Prompt';
import { Chapter } from '../entities/Chapter';
import { Section } from '../entities/Section';

export class AIController {
  private aiService: AIService;
  private promptRepository = AppDataSource.getRepository(Prompt);
  private chapterRepository = AppDataSource.getRepository(Chapter);
  private sectionRepository = AppDataSource.getRepository(Section);

  constructor() {
    this.aiService = new AIService();
  }

  /**
   * Genera contenido para un capítulo
   */
  async generateChapterContent(req: Request, res: Response) {
    try {
      const { promptId, chapterId } = req.params;

      // Obtener el prompt y el capítulo
      const prompt = await this.promptRepository.findOne({ where: { id: promptId } });
      if (!prompt) {
        return res.status(404).json({ message: 'Prompt no encontrado' });
      }

      const chapter = await this.chapterRepository.findOne({ where: { id: chapterId } });
      if (!chapter) {
        return res.status(404).json({ message: 'Capítulo no encontrado' });
      }

      // Generar contenido
      const content = await this.aiService.generateChapterContent(prompt, chapter);

      // Actualizar el capítulo con el contenido generado
      chapter.content = content;
      chapter.generated = true;
      chapter.word_count = this.countWords(content);
      await this.chapterRepository.save(chapter);

      return res.status(200).json({ 
        message: 'Contenido generado correctamente',
        content,
        chapter
      });
    } catch (error) {
      console.error('Error al generar contenido:', error);
      return res.status(500).json({ message: 'Error al generar contenido', error });
    }
  }

  /**
   * Genera contenido para una sección
   */
  async generateSectionContent(req: Request, res: Response) {
    try {
      const { promptId, chapterId, sectionId } = req.params;

      // Obtener el prompt, el capítulo y la sección
      const prompt = await this.promptRepository.findOne({ where: { id: promptId } });
      if (!prompt) {
        return res.status(404).json({ message: 'Prompt no encontrado' });
      }

      const chapter = await this.chapterRepository.findOne({ where: { id: chapterId } });
      if (!chapter) {
        return res.status(404).json({ message: 'Capítulo no encontrado' });
      }

      const section = await this.sectionRepository.findOne({ where: { id: sectionId } });
      if (!section) {
        return res.status(404).json({ message: 'Sección no encontrada' });
      }

      // Generar contenido
      const content = await this.aiService.generateSectionContent(prompt, chapter, section);

      // Actualizar la sección con el contenido generado
      section.content = content;
      section.word_count = this.countWords(content);
      await this.sectionRepository.save(section);

      return res.status(200).json({ 
        message: 'Contenido generado correctamente',
        content,
        section
      });
    } catch (error) {
      console.error('Error al generar contenido:', error);
      return res.status(500).json({ message: 'Error al generar contenido', error });
    }
  }

  /**
   * Cuenta las palabras en un texto
   */
  private countWords(text: string): number {
    return text.trim().split(/\s+/).length;
  }
} 