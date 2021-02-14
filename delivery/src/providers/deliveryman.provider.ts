import { plainToClass } from 'class-transformer';
import createHttpError from 'http-errors';
import { DeliveryMan } from '../models/deliveryman.model';
import MySQLHandler from '../modules/mysql-handler';

export type SetDeliveryMan = Omit<DeliveryMan, 'id'>;

export interface DeliveryManProviderInterface {
  find(): Promise<DeliveryMan[]>;
  findOne(id: number): Promise<DeliveryMan>;
  create(deliveryMan: SetDeliveryMan): Promise<number>;
  update(id: number, deliveryMan: SetDeliveryMan): Promise<void>;
  delete(id: number): Promise<void>;
}

export class DeliveryManProvider
implements DeliveryManProviderInterface {
  constructor(private readonly mysql: MySQLHandler) { }

  async find(): Promise<DeliveryMan[]> {
    const raw: any[] = await this.mysql.queryPromise(`
      SELECT deliveryman.*, COUNT(allocation.orderId) > 0 busy FROM deliveryman
      LEFT JOIN allocation ON deliveryman.id = allocation.deliveryManId
      GROUP BY deliveryman.id
    `);

    return raw.map(d => plainToClass(DeliveryMan, { ...d, busy: !!d.busy }));
  }

  async findOne(id: number): Promise<DeliveryMan> {
    const raw: any = await this.mysql.oneQueryPromise(`
      SELECT * FROM deliveryman WHERE id = :id
    `, { id });

    if (!raw) throw new createHttpError.NotFound();

    return plainToClass(DeliveryMan, raw);
  }

  async create(deliveryMan: SetDeliveryMan) {
    const { insertId } = await this.mysql.queryPromise(`
      INSERT INTO deliveryman
      SET firstName = :firstName,
      lastName = :lastName
    `, {
      firstName: deliveryMan.firstName,
      lastName: deliveryMan.lastName,
    });

    return +insertId;
  }

  async update(id: number, deliveryMan: SetDeliveryMan) {
    await this.mysql.queryPromise(`
      UPDATE deliveryman
      SET firstName = :firstName,
      lastName = :lastName
      WHERE id = :id
    `, {
      id,
      firstName: deliveryMan.firstName,
      lastName: deliveryMan.lastName,
    });
  }

  async delete(id: number) {
    await this.mysql.queryPromise(`
      DELETE FROM deliveryman
      WHERE id = :id
    `, { id });
  }
}
