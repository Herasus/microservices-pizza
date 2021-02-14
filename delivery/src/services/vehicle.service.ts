import { SetVehicleDto } from '../dto/set-vehicle.dto';
import { VehicleProvider } from '../providers/vehicle.provider';

export class VehicleService {
  constructor(private readonly vehicleProvider: VehicleProvider) {

  }

  getVehicles() {
    return this.vehicleProvider.find();
  }

  getVehicle(id: number) {
    return this.vehicleProvider.findOne(id);
  }

  createVehicle(data: SetVehicleDto) {
    return this.vehicleProvider.create(data);
  }

  updateVehicle(id: number, data: SetVehicleDto) {
    return this.vehicleProvider.update(id, data);
  }

  deleteVehicle(id: number) {
    return this.vehicleProvider.delete(id);
  }
}
