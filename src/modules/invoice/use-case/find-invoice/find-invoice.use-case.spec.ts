import Invoice from "../../domain/entity/invoice.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address";
import { FindInvoiceInputDto } from "./find-invoice.dto";
import FindInvoiceUseCase from "./find-invoice.use-case";

const address = new Address({
    street: "Street",
    number: 1,
    complement: "2nd floor",
    city: "City",
    state: "State",
    zipcode: "00000"
});

const product1 = new Product({
    name: "Product 1",
    price: 100
});

const product2 = new Product({
    name: "Product 2",
    price: 200
});


const invoice = new Invoice({
    name: "Invoice 1",
    document: "document",
    address: address,
    items: [product1, product2]
});

const MockInvoiceRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
});

describe("Find invoice use case test", () => {
    it("should find an invoice", async () => {
        const invoiceRepository = MockInvoiceRepository();
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

        const input: FindInvoiceInputDto = {
            id: invoice.id.toString()
        };

        const result = await findInvoiceUseCase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result).toStrictEqual({
            id: invoice.id.toString(),
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipcode: invoice.address.zipcode,
            },
            items: invoice.items.map(item => ({
                id: item.id.toString(),
                name: item.name,
                price: item.price
            })),
            total: invoice.calculateTotal(),
            createdAt: invoice.createdAt
        });
    })
})