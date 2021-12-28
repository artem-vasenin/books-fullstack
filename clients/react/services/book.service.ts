import {  IBook, IBookCreate } from "../types/interfaces";
import { API_URL } from "../constants/constants";

class BookService {
  private url = `${API_URL}book`;

  /** Сервис получения списка книг */
  async getList(): Promise<IBook[]> {
    const authorResponse = await fetch(this.url);
    return await authorResponse.json();
  }

  /**
   * Сервис получения книги по алиасу
   * @param alias
   */
  async getByAlias(alias: string): Promise<IBook> {
    const response = await fetch(`${this.url}/${alias}`);
    return await response.json();
  }

  /**
   * Сервис создания новой книги
   * @param token - токен пользователя
   * @param form - данные для создания книги
   */
  async create(token: string, form: IBookCreate): Promise<IBook> {
    const res = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        year: +form.year,
        authorId: + form.authorId,
        categoryId: +form.categoryId,
      }),
    });
    return await res.json();
  }

  /**
   * Сервис для обновления данных книги
   * @param token - токен пользователя
   * @param form - данные для обновления книги
   * @param id - идентификатор
   */
  async update(token: string, form: IBookCreate, id: number): Promise<IBook> {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        year: +form.year,
        authorId: + form.authorId,
        categoryId: +form.categoryId,
      }),
    });
    return await res.json();
  }

  /**
   * Удаление книги
   * @param token - токен пользователя
   * @param id - идентификатор
   */
  async delete(token: string, id: number): Promise<IBook> {
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

export default new BookService();