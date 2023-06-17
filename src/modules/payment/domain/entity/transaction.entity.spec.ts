import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction, { TransactionProps } from "./transaction.entity";

const transactionProps: TransactionProps = {
    id: new Id("p1"),
    orderId: "o1",
    amount: 100,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date()
};

describe("Transaction entity test", () => {
    it("should instantiate a transaction entity", () => {
        const transaction = new Transaction(transactionProps);

        expect(transaction.id).toEqual(transactionProps.id);
        expect(transaction.orderId).toEqual(transactionProps.orderId);
        expect(transaction.amount).toEqual(transactionProps.amount);
        expect(transaction.status).toEqual(transactionProps.status);
        expect(transaction.createdAt).toEqual(transactionProps.createdAt);
        expect(transaction.updatedAt).toEqual(transactionProps.updatedAt);
    })

    it("should change a transaction orderId", () => {
        const transaction = new Transaction(transactionProps);

        expect(transaction.orderId).toEqual(transactionProps.orderId);

        transaction.orderId = "o2";
        expect(transaction.orderId).toEqual("o2");
    })

    it("should change a transaction amount", () => {
        const transaction = new Transaction(transactionProps);

        expect(transaction.amount).toEqual(transactionProps.amount);

        transaction.amount = 100;

        expect(transaction.amount).toEqual(100);
    })

    it("should change a transaction status", () => {
        const transaction = new Transaction(transactionProps);

        expect(transaction.status).toEqual(transactionProps.status);

        transaction.status = "approved";

        expect(transaction.status).toEqual("approved");
    })


    it("should throw an error when amount is lower than or equal to 0", () => {
        expect(() => {
            new Transaction({ ...transactionProps, amount: -100 });
        }).toThrow("Amount must be greater than 0");

        expect(() => {
            new Transaction({ ...transactionProps, amount: 0 });
        }).toThrow("Amount must be greater than 0");
    })

    it("should approve a transaction", () => {
        const transaction = new Transaction(transactionProps);

        expect(transaction.status).toEqual(transactionProps.status);

        transaction.approve();

        expect(transaction.status).toEqual("approved");
    })

    it("should decline a transaction", () => {
        const transaction = new Transaction(transactionProps);

        expect(transaction.status).toEqual(transactionProps.status);

        transaction.decline();

        expect(transaction.status).toEqual("declined");
    })

    it("should process a transaction", () => {
        const transaction = new Transaction(transactionProps);

        expect(transaction.status).toEqual(transactionProps.status);

        transaction.process();

        expect(transaction.status).toEqual("approved");

        transaction.amount = 0;
        transaction.process();

        expect(transaction.status).toEqual("declined");
    })
})