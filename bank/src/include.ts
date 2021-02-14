import { mysql } from './modules/mysql';
import { UserBalanceProvider } from './providers/user-balance.provider';
import { AuthService } from './services/auth.service';
import { UserBalanceService } from './services/user-balance.service';

export const authService = new AuthService();
export const userBalanceProvider = new UserBalanceProvider(mysql);
export const userBalanceService = new UserBalanceService(userBalanceProvider);
