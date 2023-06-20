import { Sequelize } from "sequelize-typescript";
import Invoice, { InvoiceProps } from "../../domain/entity/invoice.entity";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";
import InvoiceRepository from "./invoice.repository";
import Address from "../../domain/value-object/address";
import Product from "../../domain/entity/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

describe("Invoice sequelize repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([InvoiceModel, ProductModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an invoice", async () => {
        const invoiceRepository = new InvoiceRepository();

        const props: InvoiceProps = {
            name: "Invoice 1",
            document: "Document",
            address: new Address({
                street: "Street",
                number: 1,
                complement: "2nd floor",
                city: "City",
                state: "State",
                zipcode: "00000"
            }),
            items: [
                new Product({
                    id: new Id("p1"),
                    name: "Product 1",
                    price: 100
                }),
                new Product({
                    id: new Id("p2"),
                    name: "Product 2",
                    price: 200
                })
            ]
        };

        const invoice = new Invoice(props);

        await invoiceRepository.add(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoice.id.toString() },
            include: ["items"]
        });

        expect(invoiceDb.toJSON()).toStrictEqual({
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
                invoice_id: expect.any(String),
                name: item.name,
                price: item.price
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        });
    })

    it("should find an invoice", async () => {
        const invoiceRepository = new InvoiceRepository();

        const values = {
            id: "i1",
            name: "Invoice 1",
            document: "Document",
            address_street: "Street",
            address_number: 1,
            address_complement: "2nd floor",
            address_city: "City",
            address_state: "State",
            address_zipcode: "000000",
            items: [{
                id: "p1",
                name: "Product 1",
                price: 100
            }],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await InvoiceModel.create(values, {
            include: [{ model: ProductModel }]
        });

        const invoice = await invoiceRepository.find(values.id);

        expect(values).toStrictEqual({
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
        });
    })
})
