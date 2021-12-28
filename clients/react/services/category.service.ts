import { ICategory, ICategoryCreate } from "../types/interfaces";
import { API_URL } from "../constants/constants";

class CategoryService {
  private url = `${API_URL}category`;

  /** Сервис получения списка категорий */
  async getList(): Promise<ICategory[]> {
    const response = await fetch(this.url);
    return await response.json();
  }

  /**
   * Сервис получения информации по id
   * @param alias - Алиас катгории
   */
  async getByAlias(alias: string): Promise<ICategory> {
    const response = await fetch(`${this.url}/${alias}`);
    return await response.json();
  }

  /**
   * Сервис создания новой категории
   * @param token - токен пользователя
   * @param form - данные для создания категории
   */
  async create(token: string, form: ICategoryCreate): Promise<ICategory> {
    const res = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    return await res.json();
  }

  /**
   * Сервис для обновления данных категории
   * @param token - токен пользователя
   * @param form - данные для обновления категории
   * @param id - идентификатор
   */
  async update(token: string, form: ICategoryCreate, id: number): Promise<ICategory> {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    return await res.json();
  }

  /**
   * Удаление категории
   * @param token - токен пользователя
   * @param id - идентификатор
   */
  async delete(token: string, id: number): Promise<ICategory> {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return await res.json();
  }
}

export default new CategoryService();