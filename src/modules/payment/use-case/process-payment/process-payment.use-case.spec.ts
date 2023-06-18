import Transaction from "../../domain/entity/transaction.entity";
import { ProcessPaymentInputDto } from "./process-payment.dto";
import ProcessPaymentUseCase from "./process-payment.use-case";

const transaction = new Transaction({
    orderId: "o1",
    amount: 100
});

const MockTransactionRepository = () => ({
    save: jest.fn().mockReturnValue(Promise.resolve(transaction))
});

describe("Process payment use case test", () => {
    it("should approve a transaction", async () => {
        const transactionRepository = MockTransactionRepository();
        const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);

        transaction.process();

        const input: ProcessPaymentInputDto = {
            orderId: "o1",
            amount: 100
        };

        const result = await processPaymentUseCase.execute(input);

        expect(transactionRepository.save).toHaveBeenCalled();
        expect(result).toStrictEqual({
            ...input,
            id: expect.any(String),
            status: "approved",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })

    it("should decline a transaction", async () => {
        const transactionRepository = MockTransactionRepository();
        const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);

        transaction.amount = 50;
        transaction.process();

        const input: ProcessPaymentInputDto = {
            orderId: "o1",
            amount: 50
        };

        const result = await processPaymentUseCase.execute(input);

        expect(transactionRepository.save).toHaveBeenCalled();
        expect(result).toStrictEqual({
            ...input,
            id: expect.any(String),
            status: "declined",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })
})