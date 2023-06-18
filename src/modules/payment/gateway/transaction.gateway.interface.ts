import Transaction from "../domain/entity/transaction.entity";

export default interface TransactionGatewayInterface {
    save(transaction: Transaction): Promise<Transaction>;
}
