import MySQLHandler from '../modules/mysql-handler';

export class AllocationProvider {
  constructor(private readonly mysql: MySQLHandler) { }

  async assign(orderId: number, deliveryManId: number, vehicleId: number) {
    await this.mysql.queryPromise(`
      INSERT INTO allocation
      SET orderId = :orderId,
      deliveryManId = :deliveryManId,
      vehicleId = :vehicleId
      ON DUPLICATE KEY UPDATE
      deliveryManId = VALUES(deliveryManId),
      vehicleId = VALUES(vehicleId)
    `, {
      orderId, deliveryManId, vehicleId,
    });
  }

  async unassign(orderId: number) {
    await this.mysql.queryPromise(`
      DELETE FROM allocation
      WHERE orderId = :orderId
    `, { orderId });
  }
}
