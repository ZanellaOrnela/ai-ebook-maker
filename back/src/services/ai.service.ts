import axios from 'axios';
import { Prompt } from '../entities/Prompt';
import { Chapter } from '../entities/Chapter';
import { Section } from '../entities/Section';

export class AIService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    this.apiUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1';
  }

  /**
   * Genera contenido para un capítulo basado en un prompt
   */
  async generateChapterContent(prompt: Prompt, chapter: Chapter): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(prompt);
      const userPrompt = this.buildUserPrompt(prompt, chapter);

      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: prompt.temperature,
          max_tokens: prompt.max_tokens,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error al generar contenido con DeepSeek:', error);
      throw new Error('Error al generar contenido con la IA');
    }
  }

  /**
   * Genera contenido para una sección específica
   */
  async generateSectionContent(prompt: Prompt, chapter: Chapter, section: Section): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(prompt);
      const userPrompt = this.buildUserPromptForSection(prompt, chapter, section);

      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: prompt.temperature,
          max_tokens: prompt.max_tokens,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error al generar contenido con DeepSeek:', error);
      throw new Error('Error al generar contenido con la IA');
    }
  }

  /**
   * Construye el prompt del sistema para la API de DeepSeek
   */
  private buildSystemPrompt(prompt: Prompt): string {
    return `Eres un escritor profesional especializado en crear contenido de alta calidad sobre ${prompt.topic}.
    Tu audiencia objetivo son ${prompt.audience}.
    Debes escribir en un tono ${prompt.tone} y con un estilo ${prompt.style}.
    ${prompt.include_intro ? 'Debes incluir una introducción.' : ''}
    ${prompt.include_outro ? 'Debes incluir una conclusión.' : ''}
    Debes escribir en ${prompt.language === 'es' ? 'español' : 'inglés'}.`;
  }

  /**
   * Construye el prompt del usuario para la API de DeepSeek
   */
  private buildUserPrompt(prompt: Prompt, chapter: Chapter): string {
    return `Por favor, escribe un capítulo sobre "${chapter.title}" para un ebook sobre ${prompt.topic}.
    Palabras clave a incluir: ${prompt.keywords}.
    Extras a considerar: ${prompt.extras}.
    La longitud debe ser ${prompt.length_preference}.`;
  }

  /**
   * Construye el prompt del usuario para una sección específica
   */
  private buildUserPromptForSection(prompt: Prompt, chapter: Chapter, section: Section): string {
    return `Por favor, escribe una sección sobre "${section.title}" para el capítulo "${chapter.title}" de un ebook sobre ${prompt.topic}.
    Palabras clave a incluir: ${prompt.keywords}.
    Extras a considerar: ${prompt.extras}.
    La sección debe ser de tipo ${section.type}.
    La longitud debe ser ${prompt.length_preference}.`;
  }
} 