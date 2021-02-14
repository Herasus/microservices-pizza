import { UserBalanceProvider } from '../providers/user-balance.provider';

export class UserBalanceService {
  constructor(private readonly userBalanceProvider: UserBalanceProvider) {

  }

  getUserBalance(userId: number) {
    return this.userBalanceProvider.get(userId);
  }

  addAmount(userId: number, amount: number) {
    return this.userBalanceProvider.add(userId, amount);
  }

  removeAmount(userId: number, amount: number) {
    return this.userBalanceProvider.remove(userId, amount);
  }
}
