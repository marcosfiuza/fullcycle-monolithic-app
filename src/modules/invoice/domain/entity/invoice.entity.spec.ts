import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice, { InvoiceProps } from "./invoice.entity";
import Product, { ProductProps } from "./product.entity";

const invoiceProps: InvoiceProps = {
    id: new Id("i1"),
    name: "Invoice 1",
    document: "Document",
    address: "Street 1",
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
};

const productProps: ProductProps = {
    id: new Id("p1"),
    name: "Product 1",
    price: 100
};

describe("Invoice entity test", () => {
    it("should instantiate an invoice", () => {
        const product = new Product(productProps);
        const invoice = new Invoice({ ...invoiceProps, items: [product] });

        expect(invoice.id).toEqual(invoiceProps.id);
        expect(invoice.name).toEqual(invoiceProps.name);
        expect(invoice.document).toEqual(invoiceProps.document);
        expect(invoice.address).toEqual(invoiceProps.address);
        expect(invoice.items[0].id).toEqual(productProps.id);
        expect(invoice.items[0].name).toEqual(productProps.name);
        expect(invoice.items[0].price).toEqual(productProps.price);
        expect(invoice.createdAt).toEqual(invoiceProps.createdAt);
        expect(invoice.updatedAt).toEqual(invoiceProps.updatedAt);
    })

    it("should change an invoice name", () => {
        const invoice = new Invoice(invoiceProps);

        expect(invoice.name).toEqual(invoiceProps.name);

        invoice.name = "Invoice 2";

        expect(invoice.name).toEqual("Invoice 2");
    })

    it("should change an invoice document", () => {
        const invoice = new Invoice(invoiceProps);

        expect(invoice.document).toEqual(invoiceProps.document);

        invoice.document = "new document";

        expect(invoice.document).toEqual("new document");
    })

    it("should change an invoice address", () => {
        const invoice = new Invoice(invoiceProps);

        expect(invoice.address).toEqual(invoiceProps.address);

        invoice.address = "Street 2";

        expect(invoice.address).toEqual("Street 2");
    })

    it("should change an invoice items", () => {
        const invoice = new Invoice(invoiceProps);

        expect(invoice.items).toEqual([]);

        invoice.items = [new Product(productProps)];

        expect(invoice.items[0].id).toEqual(productProps.id);
        expect(invoice.items[0].name).toEqual(productProps.name);
        expect(invoice.items[0].price).toEqual(productProps.price);
    })
})