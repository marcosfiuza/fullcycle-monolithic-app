import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.use-case";

const MockClientFacade = () => ({
    addClient: jest.fn(),
    findClient: jest.fn().mockResolvedValue({})
});

const MockProductFacade = () => ({
    addProduct: jest.fn(),
    checkStock: jest.fn(({ id }: { id: string }) => Promise.resolve({
        id,
        stock: 1
    }))
});

const MockCatalogFacade = () => ({
    findAllProducts: jest.fn(),
    findProduct: jest.fn()
});

const MockPaymentFacade = () => ({
    processPayment: jest.fn()
});

const MockInvoiceFacade = () => ({
    generateInvoice: jest.fn(),
    findInvoice: jest.fn()
});

const MockOrderRepository = () => ({
    add: jest.fn(),
    find: jest.fn()
});

describe("Place order use case test", () => {
    it("should throw an error when checkout not found", async () => {
        const mockClientFacade = MockClientFacade();

        mockClientFacade.findClient = jest.fn().mockResolvedValue(null);

        const placeOrderUseCase = new PlaceOrderUseCase({
            clientFacade: mockClientFacade,
            productFacade: null,
            catalogFacade: null,
            paymentFacade: null,
            invoiceFacade: null,
            orderRepository: null
        });

        expect(async () => {
            const input: PlaceOrderInputDto = {
                clientId: "c1",
                products: []
            };

            await placeOrderUseCase.execute(input);
        }).rejects.toThrowError("Client not found");
    })

    it("should throw an error when no products are selected", async () => {
        const mockClientFacade = MockClientFacade();

        const placeOrderUseCase = new PlaceOrderUseCase({
            clientFacade: mockClientFacade,
            productFacade: null,
            catalogFacade: null,
            paymentFacade: null,
            invoiceFacade: null,
            orderRepository: null
        });

        expect(async () => {
            const input: PlaceOrderInputDto = {
                clientId: "c1",
                products: []
            };

            await placeOrderUseCase.execute(input);
        }).rejects.toThrowError("No products selected");
    })

    it("should throw an error when product is out of stock", async () => {
        const mockClientFacade = MockClientFacade();
        const mockProductFacade = MockProductFacade();

        mockProductFacade.checkStock = jest.fn(
            ({ id }: { id: string }) => Promise.resolve({
                id,
                stock: id === "p1" ? 0 : 1
            })
        );

        const placeOrderUseCase = new PlaceOrderUseCase({
            clientFacade: mockClientFacade,
            productFacade: mockProductFacade,
            catalogFacade: null,
            paymentFacade: null,
            invoiceFacade: null,
            orderRepository: null
        });

        expect(async () => {
            const input: PlaceOrderInputDto = {
                clientId: "c1",
                products: [{ productId: "p1" }]
            };

            await placeOrderUseCase.execute(input);
        }).rejects.toThrowError("Product p1 is out of stock");

        expect(async () => {
            const input: PlaceOrderInputDto = {
                clientId: "c1",
                products: [{ productId: "p2" }, { productId: "p1" }]
            };

            await placeOrderUseCase.execute(input);
        }).rejects.toThrowError("Product p1 is out of stock");
    })

    it("should thrown an error when product not found", () => {
        const mockClientFacade = MockClientFacade();
        const mockProductFacade = MockProductFacade();
        const mockCatalogFacade = MockCatalogFacade();

        const placeOrderUseCase = new PlaceOrderUseCase({
            clientFacade: mockClientFacade,
            productFacade: mockProductFacade,
            catalogFacade: mockCatalogFacade,
            paymentFacade: null,
            invoiceFacade: null,
            orderRepository: null
        });

        expect(async () => {
            const input: PlaceOrderInputDto = {
                clientId: "c1",
                products: [{ productId: "p1" }]
            };

            await placeOrderUseCase.execute(input);
        }).rejects.toThrowError("Product p1 not found");
    })

    it("should not place an order", async () => {
        const mockClientFacade = MockClientFacade();
        const mockProductFacade = MockProductFacade();
        const mockCatalogFacade = MockCatalogFacade();
        const mockPaymentFacade = MockPaymentFacade();
        const mockInvoiceFacade = MockInvoiceFacade();
        const mockOrderRepository = MockOrderRepository();

        const products = [
            {
                id: "p1",
                name: "Product 1",
                description: "Description",
                salesPrice: 0
            },
            {
                id: "p2",
                name: "Product 2",
                description: "Description",
                salesPrice: 0
            }
        ];

        mockClientFacade.findClient = jest.fn().mockResolvedValue({
            id: "c1",
            name: "Client 1",
            email: "Document",
            address: "1 Street 2nd floor City, State 00000",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        mockPaymentFacade.processPayment = jest.fn().mockResolvedValue({
            id: "p1",
            orderId: "o1",
            amount: 0,
            status: "declined",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        mockInvoiceFacade.generateInvoice = jest.fn().mockResolvedValue({ id: "i1" });

        mockCatalogFacade.findProduct = jest.fn(({ id }) => {
            return products.find(product => product.id === id);
        })

        const placeOrderUseCase = new PlaceOrderUseCase({
            clientFacade: mockClientFacade,
            productFacade: mockProductFacade,
            catalogFacade: mockCatalogFacade,
            paymentFacade: mockPaymentFacade,
            invoiceFacade: mockInvoiceFacade,
            orderRepository: mockOrderRepository
        });

        const input: PlaceOrderInputDto = {
            clientId: "c1",
            products: [{ productId: "p1" }, { productId: "p2" }]
        };

        const output = await placeOrderUseCase.execute(input);

        expect(output).toStrictEqual({
            id: expect.any(String),
            invoiceId: null,
            products: products.map(product => ({
                productId: product.id
            })),
            total: 0,
            status: "pending"
        });
    })

    it("should place an order", async () => {
        const mockClientFacade = MockClientFacade();
        const mockProductFacade = MockProductFacade();
        const mockCatalogFacade = MockCatalogFacade();
        const mockPaymentFacade = MockPaymentFacade();
        const mockInvoiceFacade = MockInvoiceFacade();
        const mockOrderRepository = MockOrderRepository();

        const products = [
            {
                id: "p1",
                name: "Product 1",
                description: "Description",
                salesPrice: 100
            },
            {
                id: "p2",
                name: "Product 2",
                description: "Description",
                salesPrice: 200
            }
        ];

        mockClientFacade.findClient = jest.fn().mockResolvedValue({
            id: "c1",
            name: "Client 1",
            email: "Document",
            address: "1 Street 2nd floor City, State 00000",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        mockPaymentFacade.processPayment = jest.fn().mockResolvedValue({
            id: "p1",
            orderId: "o1",
            amount: 300,
            status: "processed",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        mockInvoiceFacade.generateInvoice = jest.fn().mockResolvedValue({ id: "i1" });

        mockCatalogFacade.findProduct = jest.fn(({ id }) => {
            return products.find(product => product.id === id);
        })

        const placeOrderUseCase = new PlaceOrderUseCase({
            clientFacade: mockClientFacade,
            productFacade: mockProductFacade,
            catalogFacade: mockCatalogFacade,
            paymentFacade: mockPaymentFacade,
            invoiceFacade: mockInvoiceFacade,
            orderRepository: mockOrderRepository
        });

        const input: PlaceOrderInputDto = {
            clientId: "c1",
            products: [{ productId: "p1" }, { productId: "p2" }]
        };

        const output = await placeOrderUseCase.execute(input);

        expect(output).toStrictEqual({
            id: expect.any(String),
            invoiceId: "i1",
            products: products.map(product => ({
                productId: product.id
            })),
            total: 300,
            status: "approved"
        });
    })
})