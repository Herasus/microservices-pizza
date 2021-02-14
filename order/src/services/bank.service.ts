import Axios, { AxiosInstance } from 'axios';
import { BANK_USERNAME, BANK_PASSWORD, BANK_API_URL } from '../constants';

/**
 * Classe permettant de communiquer avec le service Bank
 */
export class BankService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      auth: {
        username: BANK_USERNAME,
        password: BANK_PASSWORD,
      }
    });
  }

  async getUserBalance(userId: number): Promise<number> {
    const { data } = await this.axios({
      method: 'GET',
      url: `${BANK_API_URL}/balance/${userId}`,
    });

    return data.balance;
  }

  async removeAmount(userId: number, amount: number) {
    await this.axios({
      method: 'POST',
      url: `${BANK_API_URL}/balance/${userId}/remove`,
      data: {
        amount,
      }
    });
  }
}
