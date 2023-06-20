import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/sequelize/invoice.model";
import ProductModel from "../repository/sequelize/product.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { GenerateInvoiceFacadeInputDto } from "./generate-invoice.facade.dto";
import { FindInvoiceFacadeInputDto } from "./find-invoice.facade.dto";

describe("Invoice facade test", (() => {
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
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();

        const input: GenerateInvoiceFacadeInputDto = {
            name: "Invoice 1",
            document: "Document",
            street: "Street",
            number: 1,
            complement: "2nd floor",
            city: "City",
            state: "State",
            zipcode: "00000",
            items: [{
                id: "p1",
                name: "Product 1",
                price: 100
            }, {
                id: "p2",
                name: "Product 2",
                price: 200
            }]
        };
        
        const output = await invoiceFacade.generateInvoice(input);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: output.id },
            include: ["items"]
        });

        expect(invoiceDb.toJSON()).toStrictEqual({
            id: expect.any(String),
            name: output.name,
            document: output.document,
            address_street: output.street,
            address_number: output.number,
            address_complement: output.complement,
            address_city: output.city,
            address_state: output.state,
            address_zipcode: output.zipcode,
            items: output.items.map(item => ({
                id: item.id,
                invoice_id: expect.any(String),
                name: item.name,
                price: item.price
            })),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })

    it("should find an invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();

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

        const input: FindInvoiceFacadeInputDto = {
            id: "i1"
        };

        const output = await invoiceFacade.findInvoice(input);

        expect(output).toStrictEqual({
            id: values.id,
            name: values.name,
            document: values.document,
            address: {
                street: values.address_street,
                number: values.address_number,
                complement: values.address_complement,
                city: values.address_city,
                state: values.address_state,
                zipcode: values.address_zipcode
            },
            items: values.items,
            total: 100,
            createdAt: values.createdAt
        });
    })
}))