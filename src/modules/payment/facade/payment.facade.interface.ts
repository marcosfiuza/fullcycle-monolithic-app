import { ProcessPaymentFacadeInputDto, ProcessPaymentFacadeOutputDto } from "./process-payment.facade.dto";

export default interface PaymentAdmFacadeInterface {
    processPayment(input: ProcessPaymentFacadeInputDto): Promise<ProcessPaymentFacadeOutputDto>;
}
