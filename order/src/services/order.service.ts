import createHttpError from 'http-errors';
import { PutOrderDto } from '../dto/put-order.dto';
import { OrderState } from '../models/order-state.enum';
import { OrderProvider } from '../providers/order.provider';
import { calculateOrderPrice } from '../utilities/calculate-order-price';
import { BankService } from './bank.service';
import { PizzaService } from './pizza.service';

export class OrderService {
  constructor(
    private readonly orderProvider: OrderProvider,
    private readonly bankService: BankService,
    private readonly pizzaService: PizzaService,
  ) {

  }

  async getOrdersByUser(userId: number) {
    return this.orderProvider.findByUser(userId);
  }

  async getOrder(orderId: number) {
    return this.orderProvider.findOne(orderId);
  }

  async getAllOrders() {
    return this.orderProvider.find();
  }

  async setOrderState(orderId: number, state: OrderState) {
    return this.orderProvider.setState(orderId, state);
  }

  async placeOrder(userId: number, order: PutOrderDto) {
    // On récupère la liste de nos pizzas
    const pizzas = await this.pizzaService.getPizzas();

    // On calcule le prix total de la commande
    let totalPrice = calculateOrderPrice(order.pizzaList, pizzas);

    // On récupère le solde de l'utilisateur
    let balance = await this.bankService.getUserBalance(userId);

    // On vérifie qu'il a assez d'argent
    if (balance < totalPrice) {
      throw new createHttpError.BadRequest('Not enough funds');
    }

    // On crée la commande
    await this.orderProvider.create({
      orderDate: new Date(),
      address: order.address,
      totalPrice,
      userId,
      pizzas: order.pizzaList.map(pizza => ({
        quantity: pizza.quantity,
        size: pizza.size,
        pizzaId:
          pizza.pizzaId
      })),
    });

    // On met à jour le solde de l'utilisateur
    await this.bankService.removeAmount(userId, totalPrice);
  }
}
