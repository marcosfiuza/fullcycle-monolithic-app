import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/sequelize/transaction.model";
import PaymentFacadeFactory from "../factory/payment.facade.factory";
import { ProcessPaymentFacadeInputDto } from "./process-payment.facade.dto";

describe("Transaction adm facade test", (() => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([TransactionModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should save a transaction", async () => {
        const paymentFacade = PaymentFacadeFactory.create();

        const input: ProcessPaymentFacadeInputDto = {
            orderId: "o1",
            amount: 100
        };

        const output = await paymentFacade.processPayment(input);

        const transactionDb = await TransactionModel.findOne({
            where: { id: output.id }
        });

        expect(transactionDb.toJSON()).toStrictEqual({
            id: expect.any(String),
            orderId: input.orderId,
            amount: input.amount,
            status: "approved",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })
}))