import { Sequelize } from "sequelize-typescript";
import Transaction, { TransactionProps } from "../../domain/entity/transaction.entity";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";

describe("Transaction sequelize repository test", () => {
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
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save a transaction", async () => {
        const transactionRepository = new TransactionRepository();

        const props: TransactionProps = {
            orderId: "o1",
            amount: 100
        };

        const transaction = new Transaction(props);

        transaction.process();

        await transactionRepository.save(transaction);

        const transactionDb = await TransactionModel.findOne({
            where: { id: transaction.id.toString() }
        });

        expect(transactionDb.toJSON()).toStrictEqual({
            id: transaction.id.toString(),
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        });
    })
})
