export interface OrderModel {
    id: number,
    state: string,
    orderDate: string,
    deliveryDate: string,
    totalPrice: number,
    address: string,
    vehicle_id: number,
    delivery_man_id: number,
    customer_id: number
}

