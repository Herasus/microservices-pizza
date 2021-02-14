import Axios, { AxiosInstance } from 'axios';
import { AUTH_API_URL } from '../constants';
import { JwtUser } from '../models/jwt-user';

/**
 * Classe permettant de vérifier l'authentification
 */
export class AuthService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create();
  }

  async getUser(jwt: string): Promise<JwtUser> {
    const { data } = await this.axios({
      url: `${AUTH_API_URL}/profile`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });

    return data;
  }
}
