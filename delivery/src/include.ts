import { mysql } from './modules/mysql';
import { AllocationProvider } from './providers/allocation.provider';
import { DeliveryManProvider } from './providers/deliveryman.provider';
import { VehicleProvider } from './providers/vehicle.provider';
import { AllocationService } from './services/allocation.service';
import { AuthService } from './services/auth.service';
import { DeliveryManService } from './services/deliveryman.service';
import { OrderService } from './services/order.service';
import { VehicleService } from './services/vehicle.service';

export const authService = new AuthService();
export const deliveryManProvider = new DeliveryManProvider(mysql);
export const deliveryManService = new DeliveryManService(deliveryManProvider);
export const vehicleProvider = new VehicleProvider(mysql);
export const vehicleService = new VehicleService(vehicleProvider);
export const allocationProvider = new AllocationProvider(mysql);
export const orderService = new OrderService();
export const allocationService = new AllocationService(allocationProvider, orderService);
