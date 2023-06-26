import Order from "../domain/entity/order.entity";

export default interface CheckoutGatewayInterface {
    addOrder(order: Order): Promise<void>;
    findOrder(id: string): Promise<Order> | null;
}
