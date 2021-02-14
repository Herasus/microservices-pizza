import { SetDeliveryManDto } from '../dto/set-delivery-man.dto';
import { DeliveryManProvider } from '../providers/deliveryman.provider';

export class DeliveryManService {
  constructor(private readonly deliveryManProvider: DeliveryManProvider) {

  }

  getDeliveryMen() {
    return this.deliveryManProvider.find();
  }

  getOneDeliveryMan(id: number) {
    return this.deliveryManProvider.findOne(id);
  }

  createDeliveryMan(data: SetDeliveryManDto) {
    return this.deliveryManProvider.create(data);
  }

  updateDeliveryMan(id: number, data: SetDeliveryManDto) {
    return this.deliveryManProvider.update(id, data);
  }

  deleteDeliveryMan(id: number) {
    return this.deliveryManProvider.delete(id);
  }
}
