import TransactionGatewayInterface from "../../gateway/transaction.gateway.interface";
import Transaction, { TransactionProps } from "../../domain/entity/transaction.entity";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements TransactionGatewayInterface {
    async save(transaction: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: transaction.id.toString(),
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        });

        return transaction;
    }
}
