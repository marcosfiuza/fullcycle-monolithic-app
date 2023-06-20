import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import InvoiceGatewayInterface from "../../gateway/invoice.gateway.interface";
import { FindInvoiceInputDto, FindInvoiceOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
    private _invoiceRepository: InvoiceGatewayInterface;

    constructor(invoiceRepository: InvoiceGatewayInterface) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
        const invoice = await this._invoiceRepository.find(input.id);

        const output: FindInvoiceOutputDto = {
            id: invoice.id.toString(),
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipcode: invoice.address.zipcode
            },
            items: invoice.items.map((item) => ({
                id: item.id.toString(),
                name: item.name,
                price: item.price
            })),
            total: invoice.calculateTotal(),
            createdAt: invoice.createdAt
        };

        return output;
    }
}
