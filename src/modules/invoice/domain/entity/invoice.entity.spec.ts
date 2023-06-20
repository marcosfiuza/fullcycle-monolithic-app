import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import Product from "./product.entity";
import Invoice, { InvoiceProps } from "./invoice.entity";

const address = new Address({
    street: "Street",
    number: 1,
    complement: "2nd floor",
    city: "City",
    state: "State",
    zipcode: "00000"
});

const product1 = new Product({
    id: new Id("p1"),
    name: "Product 1",
    price: 100
});

const product2 = new Product({
    id: new Id("p2"),
    name: "Product 2",
    price: 200
});

const invoiceProps: InvoiceProps = {
    id: new Id("i1"),
    name: "Invoice 1",
    document: "Document",
    address: address,
    items: [product1, product2],
    createdAt: new Date(),
    updatedAt: new Date()
};

describe("Invoice entity test", () => {
    it("should instantiate an invoice", () => {
        const invoice = new Invoice(invoiceProps);

        expect(invoice.id).toEqual(invoiceProps.id);
        expect(invoice.name).toEqual(invoiceProps.name);
        expect(invoice.document).toEqual(invoiceProps.document);
        expect(invoice.address).toEqual(invoiceProps.address);
        expect(invoice.items).toEqual(invoiceProps.items);
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

        const newAddress = new Address({
            street: "Avenue",
            number: 2,
            complement: "3rd floor",
            city: "New city",
            state: "New state",
            zipcode: "00001"
        });

        invoice.address = newAddress;

        expect(invoice.address).toEqual(newAddress);
    })

    it("should change an invoice items", () => {
        const invoice = new Invoice(invoiceProps);

        expect(invoice.items).toEqual(invoiceProps.items);

        invoice.items = [product1];

        expect(invoice.items).toEqual([product1]);
    })

    it("should calculate an invoice total", () => {
        const invoice = new Invoice(invoiceProps);

        expect(invoice.calculateTotal()).toEqual(300);
    })
})