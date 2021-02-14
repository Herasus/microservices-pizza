import { OrderState } from '../models/order-state.enum';
import { AllocationProvider } from '../providers/allocation.provider';
import { OrderService } from './order.service';

export class AllocationService {
  constructor(
    private readonly allocationProvider: AllocationProvider,
    private readonly orderService: OrderService,
  ) {}

  async assignOrder(orderId: number, deliveryManId: number, vehicleId: number) {
    // Assign vehicles
    await this.allocationProvider.assign(orderId, deliveryManId, vehicleId);

    // Set order state
    await this.orderService.setOrderStatus(orderId, OrderState.Delivery);
  }

  async endOrder(orderId: number) {
    // Unassign vehicles
    await this.allocationProvider.unassign(orderId);

    // Set order state
    await this.orderService.setOrderStatus(orderId, OrderState.Delivered);
  }
}
