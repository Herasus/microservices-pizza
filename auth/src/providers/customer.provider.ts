import { plainToClass } from 'class-transformer';
import { Customer } from '../models/customer.model';
import MySQLHandler from '../modules/mysql-handler';

export interface CustomerProviderInterface {
  /**
   * Finds a customer by id
   * @param id The customer id
   */
  find(id: number): Promise<Customer | false>;

  /**
   * Finds a customer by the email
   * @param email The customer email
   */
  findByEmail(email: string): Promise<Customer | false>;

  /**
   * Creates a customer
   * @param customer The customer object
   */
  create(customer: Omit<Customer, 'id'>): Promise<Customer>;

  /**
   * Creates a customer
   * @param customer The customer object
   */
  updatePassword(id: number, password: string): Promise<void>;
}

export class CustomerProvider
implements CustomerProviderInterface {
  private mysql: MySQLHandler;

  constructor(mysql: MySQLHandler) {
    this.mysql = mysql;
  }

  async find(id: number) {
    const rep = await this.mysql.oneQueryPromise(`
      SELECT * FROM Customer WHERE id = :id
    `, { id });

    if (!rep) return false;

    return plainToClass(Customer, rep);
  }

  async findByEmail(email: string) {
    const rep = await this.mysql.oneQueryPromise(`
      SELECT * FROM Customer WHERE email = :email
    `, { email });

    if (!rep) return false;

    return plainToClass(Customer, rep);
  }

  async create(customer: Omit<Customer, 'id'>): Promise<Customer> {
    const rep = await this.mysql.queryPromise(`
      INSERT INTO Customer
      SET
        email = :email,
        password = :password,
        firstName = :firstName,
        lastName = :lastName,
        isAdmin = :isAdmin
    `, {
      email: customer.email,
      password: customer.password,
      firstName: customer.firstName,
      lastName: customer.lastName,
      isAdmin: +customer.isAdmin,
    });

    const id = rep.insertId;

    return plainToClass(Customer, {
      id,
      ...customer,
    });
  }

  async updatePassword(id: number, password: string): Promise<void> {
    await this.mysql.queryPromise(`
      UPDATE Customer
      SET password = :password
      WHERE id = :id
    `, {
      password,
      id,
    });
  }
}
