import { ProcessPaymentFacadeInputDto, ProcessPaymentFacadeOutputDto } from "./process-payment.facade.dto";

export default interface PaymentFacadeInterface {
    processPayment(input: ProcessPaymentFacadeInputDto): Promise<ProcessPaymentFacadeOutputDto>;
}
