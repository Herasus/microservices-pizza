import axios, { AxiosInstance } from 'axios';
import { ORDER_API_URL } from '../constants';
import { OrderState } from '../models/order-state.enum';

export class OrderService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  async setOrderStatus(orderId: number, state: OrderState) {
    await this.axios({
      method: 'POST',
      url: `${ORDER_API_URL}/admin/orders/${orderId}/state`,
      data: {
        state,
      }
    });
  }
}
