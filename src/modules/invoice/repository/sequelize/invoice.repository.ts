import InvoiceGatewayInterface from "../../gateway/invoice.gateway.interface";
import Invoice, { InvoiceProps } from "../../domain/entity/invoice.entity";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/value-object/address";
import Product from "../../domain/entity/product.entity";

export default class InvoiceRepository implements InvoiceGatewayInterface {
    async add(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.toString(),
            name: invoice.name,
            document: invoice.document,
            address_street: invoice.address.street,
            address_number: invoice.address.number,
            address_complement: invoice.address.complement,
            address_city: invoice.address.city,
            address_state: invoice.address.state,
            address_zipcode: invoice.address.zipcode,
            items: invoice.items.map(item => ({
                id: item.id.toString(),
                name: item.name,
                price: item.price
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        }, {
            include: [{ model: ProductModel }]
        });
    }

    async find(id: string): Promise<Invoice> {
        const invoiceDb = await InvoiceModel.findOne({
            where: { id },
            include: ["items"],
            rejectOnEmpty: true
        });

        const props: InvoiceProps = {
            id: new Id(invoiceDb.id),
            name: invoiceDb.name,
            document: invoiceDb.document,
            address: new Address({
                street: invoiceDb.address_street,
                number: invoiceDb.address_number,
                complement: invoiceDb.address_complement,
                city: invoiceDb.address_city,
                state: invoiceDb.address_state,
                zipcode: invoiceDb.address_zipcode
            }),
            items: invoiceDb.items.map(item => new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })),
            createdAt: invoiceDb.createdAt,
            updatedAt: invoiceDb.updatedAt
        };

        const invoice = new Invoice(props);

        return invoice;
    }
}