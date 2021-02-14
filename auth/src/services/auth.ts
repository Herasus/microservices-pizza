import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { CustomerProviderInterface } from '../providers/customer.provider';
import { generateToken } from './jwt';
import { RegisterDto } from '../dto/register.dto';
import { ADMIN_USER_EMAIL, ADMIN_USER_PASSWORD } from '../constants';

export class AuthService {
  private customerProvider: CustomerProviderInterface;

  constructor(customerProvider: CustomerProviderInterface) {
    this.customerProvider = customerProvider;
  }

  async initAdminUser() {
    if (!ADMIN_USER_EMAIL || !ADMIN_USER_PASSWORD) return;

    const user = await this.customerProvider.findByEmail(ADMIN_USER_EMAIL);
    if (!user) {
      // Create the admin user
      await this.customerProvider.create({
        firstName: 'Admin',
        lastName: 'Admin',
        email: ADMIN_USER_EMAIL,
        password: bcrypt.hashSync(ADMIN_USER_PASSWORD, 10),
        isAdmin: true,
      });
    }
  }

  /**
   * Authenticate a customer
   * @param email The user email
   * @param password The user password
   * @param withAdmin
   */
  async authenticate(email: string, password: string, withAdmin = false) {
    // Find by email
    const user = await this.customerProvider.findByEmail(email);
    if (!user) {
      throw new createHttpError.Unauthorized('Bad credentials');
    }

    // Check password
    if (!bcrypt.compareSync(password, user.password)) {
      throw new createHttpError.Unauthorized('Bad credentials');
    }

    if (!user.isAdmin && withAdmin) {
      throw new createHttpError.Unauthorized('Not an admin');
    }

    // Generate the JWT token
    return generateToken(user);
  }

  /**
   * Register a customer
   * @param user The user DTO object
   */
  async register(user: RegisterDto) {
    // Find an existing user by email
    const existing = await this.customerProvider.findByEmail(user.email);
    if (existing) {
      throw new createHttpError.BadRequest('The email already exists.');
    }

    // Create the user
    return this.customerProvider.create({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
      isAdmin: false,
    });
  }
}
