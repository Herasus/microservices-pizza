import { plainToClass } from 'class-transformer';
import createHttpError from 'http-errors';
import { CustomerOrder } from '../models/customer-order.model';
import { OrderState } from '../models/order-state.enum';
import { PizzaOrder } from '../models/pizza-order.model';
import MySQLHandler from '../modules/mysql-handler';

export class OrderProvider {
  constructor(private readonly mysql: MySQLHandler) {

  }

  static fromDb(data: any): CustomerOrder {
    return plainToClass(CustomerOrder, {
      id: data.id,
      state: data.state,
      orderDate: new Date(data.orderDateTs * 1000),
      deliveryDate: data.deliveryDateTs !== null ? new Date(data.deliveryDateTs * 1000) : null,
      totalPrice: data.totalPrice,
      address: data.address,
      userId: data.userId,
    });
  }

  async find() {
    const orders: any[] = await this.mysql.queryPromise(`
      SELECT
        *,
        UNIX_TIMESTAMP(orderDate) orderDateTs,
        UNIX_TIMESTAMP(deliveryDate) deliveryDateTs
        FROM CustomerOrder
      ORDER BY orderDate DESC
    `);

    return orders.map(order => OrderProvider.fromDb(order));
  }

  async findOne(id: number) {
    const order: any = await this.mysql.oneQueryPromise(`
      SELECT
        *,
        UNIX_TIMESTAMP(orderDate) orderDateTs,
        UNIX_TIMESTAMP(deliveryDate) deliveryDateTs
        FROM CustomerOrder
      WHERE id = :id
    `, { id });

    if (!order) throw new createHttpError.NotFound();

    return OrderProvider.fromDb(order);
  }

  async findByUser(userId: number) {
    const orders: any[] = await this.mysql.queryPromise(`
      SELECT
        *,
        UNIX_TIMESTAMP(orderDate) orderDateTs,
        UNIX_TIMESTAMP(deliveryDate) deliveryDateTs
        FROM CustomerOrder
      WHERE userId = :userId
      ORDER BY orderDate DESC
    `, { userId });

    return orders.map(order => OrderProvider.fromDb(order));
  }

  async create(order: Omit<CustomerOrder, 'id' | 'state' | 'deliveryDate'>) {
    const { insertId } = await this.mysql.queryPromise(`
      INSERT INTO CustomerOrder SET
      state = :state,
      orderDate = FROM_UNIXTIME(:orderDate),
      deliveryDate = NULL,
      totalPrice = :totalPrice,
      address = :address,
      userId = :userId
    `, {
      state: OrderState.Preparation,
      orderDate: order.orderDate.valueOf() / 1000,
      totalPrice: order.totalPrice,
      address: order.address,
      userId: order.userId,
    });

    await this.putOrderPizzas(+insertId, order.pizzas);

    return +insertId;
  }

  private async putOrderPizzas(orderId: number, pizzaOrders: PizzaOrder[]) {
    const promises = pizzaOrders.map(item => this.mysql.queryPromise(`
      INSERT INTO pizzaorder
      SET orderId = :orderId,
      pizzaId = :pizzaId,
      quantity = :quantity,
      size = :size
    `, {
      orderId,
      pizzaId: item.pizzaId,
      quantity: item.quantity,
      size: item.size,
    }));

    await Promise.all(promises);
  }

  async setState(orderId: number, state: OrderState) {
    await this.mysql.queryPromise(`
      UPDATE customerorder
      SET state = :state
      WHERE id = :orderId
    `, { orderId, state });
  }
}
