import axios, { AxiosInstance } from 'axios';
import { PIZZA_API_URL } from '../constants';
import { Pizza } from '../models/pizza.model';

/**
 * Classe permettant d'appeler le service Pizza 🍕
 */
export class PizzaService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  async getPizzas(): Promise<Pizza[]> {
    const { data } = await this.axios({
      method: 'GET',
      url: `${PIZZA_API_URL}/pizzas`,
    });

    return data;
  }
}
