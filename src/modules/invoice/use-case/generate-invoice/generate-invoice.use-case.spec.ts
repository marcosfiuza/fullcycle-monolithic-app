import { GenerateInvoiceInputDto } from "./generate-invoice.dto";
import GenerateInvoiceUseCase from "./generate-invoice.use-case";

const MockInvoiceRepository = () => ({
    add: jest.fn(),
    find: jest.fn()
});

describe("Generate invoice use case test", () => {
    it("should generate an invoice", async () => {
        const invoiceRepository = MockInvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);

        const input: GenerateInvoiceInputDto = {
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

        const result = await generateInvoiceUseCase.execute(input);

        expect(invoiceRepository.add).toHaveBeenCalled();
        expect(result).toStrictEqual({
            ...input,
            id: expect.any(String),
            total: 300
        });
    })
})
