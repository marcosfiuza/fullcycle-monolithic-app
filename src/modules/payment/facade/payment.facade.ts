import UseCaseInterface from "../../@shared/use-case/use-case.interface";
import { ProcessPaymentFacadeInputDto, ProcessPaymentFacadeOutputDto } from "./process-payment.facade.dto";
import PaymentFacadeInterface from "./payment.facade.interface";

export interface UseCasesProps {
    processPaymentUseCase: UseCaseInterface;
}

export default class PaymentFacade implements PaymentFacadeInterface {
    private _processPaymentUseCase: UseCaseInterface;

    constructor(props: UseCasesProps) {
        this._processPaymentUseCase = props.processPaymentUseCase;
    }

    async processPayment(input: ProcessPaymentFacadeInputDto): Promise<ProcessPaymentFacadeOutputDto> {
        return await this._processPaymentUseCase.execute(input);
    }
}
