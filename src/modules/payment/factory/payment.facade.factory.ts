import PaymentFacade from "../facade/payment.facade";
import PaymentFacadeInterface from "../facade/payment.facade.interface";
import TransactionRepository from "../repository/sequelize/transaction.repository";
import ProcessPaymentUseCase from "../use-case/process-payment/process-payment.use-case";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const transactionRepository = new TransactionRepository();
        const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);
        const paymentFacade = new PaymentFacade({ processPaymentUseCase });

        return paymentFacade;
    }
}