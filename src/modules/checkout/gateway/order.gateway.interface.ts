import Order from "../domain/entity/order.entity";

export default interface OrderGatewayInterface {
    add(order: Order): Promise<void>;
    find(id: string): Promise<Order> | null;
}
