import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import Invoice, { InvoiceProps } from "../../domain/entity/invoice.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address";
import InvoiceGatewayInterface from "../../gateway/invoice.gateway.interface";
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    private _invoiceRepository: InvoiceGatewayInterface;

    constructor(invoiceRepository: InvoiceGatewayInterface) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
        const props: InvoiceProps = {
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipcode: input.zipcode
            }),
            items: input.items.map(item => new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            }))
        };

        const invoice = new Invoice(props);

        await this._invoiceRepository.add(invoice);

        const output: GenerateInvoiceOutputDto = {
            id: invoice.id.toString(),
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipcode: invoice.address.zipcode,
            items: invoice.items.map(item => ({
                id: item.id.toString(),
                name: item.name,
                price: item.price
            })),
            total: invoice.calculateTotal()
        };

        return output;
    }
}