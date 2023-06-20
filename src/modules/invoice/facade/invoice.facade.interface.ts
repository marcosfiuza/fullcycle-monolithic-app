import { GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./generate-invoice.facade.dto";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto } from "./find-invoice.facade.dto";

export default interface InvoiceFacadeInterface {
    generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
    findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}
