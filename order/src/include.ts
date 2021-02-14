import { mysql } from './modules/mysql';
import { OrderProvider } from './providers/order.provider';
import { AuthService } from './services/auth.service';
import { BankService } from './services/bank.service';
import { OrderService } from './services/order.service';
import { PizzaService } from './services/pizza.service';

export const orderProvider = new OrderProvider(mysql);
export const authService = new AuthService();
export const bankService = new BankService();
export const pizzaService = new PizzaService();
export const orderService = new OrderService(orderProvider, bankService, pizzaService);
