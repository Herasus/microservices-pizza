import createHttpError from 'http-errors';
import MySQLHandler from '../modules/mysql-handler';

export interface UserBalanceProviderInterface {
  /**
   * Returns the user balance
   * @param userId User id
   */
  get(userId: number): Promise<number>;

  /**
   * Add amount
   * @param userId User id
   * @param amount Amount to add
   */
  add(userId: number, amount: number): Promise<void>;

  /**
   * Remove amount from an account
   * @param userId User id
   * @param amount Amount to remove
   */
  remove(userId: number, amount: number): Promise<void>;

}

export class UserBalanceProvider
implements UserBalanceProviderInterface {
  constructor(private readonly mysql: MySQLHandler) { }

  async get(userId: number) {
    const raw = await this.mysql.oneQueryPromise(`
      SELECT balance FROM userbalance
      WHERE userId = :userId 
    `, { userId });

    if (!raw) return 0;
    return +raw.balance;
  }

  async add(userId: number, amount: number) {
    const current = await this.get(userId);
    const newBalance = current + amount;
    await this.put(userId, newBalance);
  }

  async remove(userId: number, amount: number) {
    const current = await this.get(userId);
    const newBalance = current - amount;
    if (newBalance < 0) {
      throw new createHttpError.BadRequest('Not enough money');
    }

    await this.put(userId, newBalance);
  }

  private async put(userId: number, balance: number) {
    await this.mysql.queryPromise(`
      INSERT INTO userbalance
      SET userId = :userId,
      balance = :balance
      ON DUPLICATE KEY UPDATE balance = VALUES(balance)
    `, { userId, balance });
  }
}
