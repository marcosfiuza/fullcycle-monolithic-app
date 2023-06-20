import UseCaseInterface from "../../@shared/use-case/use-case.interface";
import { GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./generate-invoice.facade.dto";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto } from "./find-invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";

export interface UseCasesProps {
    generateInvoiceUseCase: UseCaseInterface;
    findInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateInvoiceUseCase: UseCaseInterface;
    private _findInvoiceUseCase: UseCaseInterface;

    constructor(props: UseCasesProps) {
        this._generateInvoiceUseCase = props.generateInvoiceUseCase;
        this._findInvoiceUseCase = props.findInvoiceUseCase;
    }

    async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateInvoiceUseCase.execute(input);
    }

    async findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findInvoiceUseCase.execute(input);
    }
}
