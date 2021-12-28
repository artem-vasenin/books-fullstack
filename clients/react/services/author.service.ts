import { IAuthor, IAuthorCreate } from "../types/interfaces";
import { API_URL } from "../constants/constants";

class AuthorService {
  private url = `${API_URL}author`;

  /** Сервис получения списка авторов */
  async getList(): Promise<IAuthor[]> {
    const response = await fetch(this.url);
    return await response.json();
  }

  /**
   * Сервис получения информации по id
   * @param id - идентификатор
   */
  async getById(id: string): Promise<IAuthor> {
    const response = await fetch(`${this.url}/${id}`);
    return await response.json();
  }

  /**
   * Сервис создания нового автора
   * @param token - токен пользователя
   * @param form - данные для создания автора
   */
  async create(token: string, form: IAuthorCreate): Promise<IAuthor> {
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
   * Сервис для обновления данных пользователя
   * @param token - токен пользователя
   * @param form - данные для обновления автора
   * @param id - идентификатор
   */
  async update(token: string, form: IAuthorCreate, id: number): Promise<IAuthor> {
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
   * Удаление автора
   * @param token - токен пользователя
   * @param id - идентификатор
   */
  async delete(token: string, id: number): Promise<IAuthor> {
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

export default new AuthorService();