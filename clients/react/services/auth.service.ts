import { ILoginForm, IRegForm, IUser } from "../types/interfaces";
import { API_URL } from "../constants/constants";

class AuthService {
  private url = `${API_URL}user`;

  /**
   * Сервис входа в систему
   * @param form - данные для входа
   */
  async login(form: ILoginForm): Promise<IUser> {
    const res = await fetch(`${this.url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    return await res.json();
  }

  /**
   * Сервис входа в систему
   * @param form - данные для входа
   */
  async register(form: IRegForm): Promise<IUser> {
    const res = await fetch(`${this.url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    return await res.json();
  }
}

export default new AuthService();