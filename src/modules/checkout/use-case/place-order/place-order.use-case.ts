import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/entity/client.entity";
import Order from "../../domain/entity/order.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address";
import OrderGatewayInterface from "../../gateway/order.gateway.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export type PlaceOrderUseCaseProps = {
    clientFacade: ClientAdmFacadeInterface;
    productFacade: ProductAdmFacadeInterface;
    catalogFacade: StoreCatalogFacadeInterface;
    paymentFacade: PaymentFacadeInterface;
    invoiceFacade: InvoiceFacadeInterface;
    orderRepository: OrderGatewayInterface;
}

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _orderRepository: OrderGatewayInterface;

    constructor(props: PlaceOrderUseCaseProps) {
        this._clientFacade = props.clientFacade;
        this._productFacade = props.productFacade;
        this._catalogFacade = props.catalogFacade;
        this._paymentFacade = props.paymentFacade;
        this._invoiceFacade = props.invoiceFacade;
        this._orderRepository = props.orderRepository;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this._clientFacade.findClient({ id: input.clientId });

        if (!client) {
            throw new Error("Client not found");
        }

        await this.validateProducts(input);
        await this.checkProductsStock(input);

        const products = await Promise.all(
            input.products.map(async ({ productId }) => await this.getProduct(productId))
        );

        const order = new Order({
            client: new Client({
                id: new Id(client.id),
                name: client.name,
                email: client.email,
                address: new Address({
                    street: client.street,
                    number: client.number,
                    complement: client.complement,
                    city: client.city,
                    state: client.state,
                    zipcode: client.zipcode
                })
            }),
            products: products.map(product => new Product({
                id: product.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }))
        });

        const payment = await this._paymentFacade.processPayment({
            orderId: order.id.toString(),
            amount: order.total
        });

        const invoice = payment.status === "processed" ?
            await this._invoiceFacade.generateInvoice({
                name: client.name,
                document: "document",
                street: "Street",
                number: 1,
                complement: "2nd floor",
                city: "City",
                state: "State",
                zipcode: "00000",
                items: products.map(product => ({
                    id: product.id.toString(),
                    name: product.name,
                    price: product.salesPrice
                }))
            }) :
            null;

        if (payment.status === "processed") {
            order.approve();
        }

        await this._orderRepository.add(order);

        return {
            id: order.id.toString(),
            invoiceId: payment.status === "processed" ? invoice.id : null,
            products: order.products.map(product => ({
                productId: product.id.toString()
            })),
            total: order.total,
            status: order.status
        };
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected");
        }
    }

    private async checkProductsStock(input: PlaceOrderInputDto): Promise<void> {
        for (const { productId } of input.products) {
            const product = await this._productFacade.checkStock({ id: productId });

            if (product.stock <= 0) {
                throw new Error(`Product ${productId} is out of stock`);
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.findProduct({ id: productId });

        if (!product) {
            throw new Error(`Product ${productId} not found`);
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        });
    }
}