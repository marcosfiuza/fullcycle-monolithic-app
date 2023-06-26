
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Order, { OrderProps } from "./order.entity";
import Product from "./product.entity";

const orderProps: OrderProps = {
    id: new Id("o1"),
    client: new Client({
        id: new Id("p1"),
        name: "Client 1",
        email: "client1@localhost.net",
        address: "Street 1"
    }),
    products: [
        new Product({
            id: new Id("p1"),
            name: "Product 1",
            description: "Description",
            salesPrice: 100
        }),
        new Product({
            id: new Id("p2"),
            name: "Product 2",
            description: "Description",
            salesPrice: 200
        })
    ],
    status: "pending"
};

describe("Order entity test", () => {
    it("should instantiate an order", () => {
        const order = new Order(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.client).toEqual(orderProps.client);
        expect(order.products).toEqual(orderProps.products);
        expect(order.status).toEqual(orderProps.status);
    })

    it("should approve an order", () => {
        const order = new Order(orderProps);

        expect(order.status).toEqual("pending");

        order.approve();

        expect(order.status).toEqual("approved");
    })

    it("should calculate an order total", () => {
        const order = new Order(orderProps);

        expect(order.total).toEqual(300);
    })
})