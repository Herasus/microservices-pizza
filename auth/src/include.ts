import { mysql } from './modules/mysql';
import { CustomerProvider } from './providers/customer.provider';
import { AuthService } from './services/auth';

export const customerProvider = new CustomerProvider(mysql);
export const authService = new AuthService(customerProvider);
