import { plainToClass } from 'class-transformer';
import createHttpError from 'http-errors';
import { Vehicle } from '../models/vehicle.model';
import MySQLHandler from '../modules/mysql-handler';

export type SetVehicle = Omit<Vehicle, 'id'>;

export interface VehicleProviderInterface {
  find(): Promise<Vehicle[]>;
  findOne(id: number): Promise<Vehicle>;
  create(vehicle: SetVehicle): Promise<number>;
  update(id: number, Vehicle: SetVehicle): Promise<void>;
  delete(id: number): Promise<void>;
}

export class VehicleProvider
implements VehicleProviderInterface {
  constructor(private readonly mysql: MySQLHandler) { }

  async find(): Promise<Vehicle[]> {
    const raw: any[] = await this.mysql.queryPromise(`
    SELECT vehicle.*, COUNT(allocation.orderId) > 0 busy FROM vehicle
    LEFT JOIN allocation ON vehicle.id = allocation.vehicleId
    GROUP BY vehicle.id
    `);

    return raw.map(d => plainToClass(Vehicle, { ...d, busy: !!d.busy }));
  }

  async findOne(id: number): Promise<Vehicle> {
    const raw: any = await this.mysql.oneQueryPromise(`
      SELECT * FROM vehicle WHERE id = :id
    `, { id });

    if (!raw) throw new createHttpError.NotFound();

    return plainToClass(Vehicle, raw);
  }

  async create(vehicle: SetVehicle) {
    const { insertId } = await this.mysql.queryPromise(`
      INSERT INTO vehicle
      SET type = :type,
      plate = :plate
    `, {
      type: vehicle.type,
      plate: vehicle.plate,
    });

    return +insertId;
  }

  async update(id: number, vehicle: SetVehicle) {
    await this.mysql.queryPromise(`
      UPDATE vehicle
      SET type = :type,
      plate = :plate
      WHERE id = :id
    `, {
      id,
      type: vehicle.type,
      plate: vehicle.plate,
    });
  }

  async delete(id: number) {
    await this.mysql.queryPromise(`
      DELETE FROM vehicle
      WHERE id = :id
    `, { id });
  }
}
