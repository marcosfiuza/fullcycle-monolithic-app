import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import Transaction, { TransactionProps } from "../../domain/entity/transaction.entity";
import TransactionGatewayInterface from "../../gateway/transaction.gateway.interface";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    private _transactionRepository: TransactionGatewayInterface;

    constructor(transactionRepository: TransactionGatewayInterface) {
        this._transactionRepository = transactionRepository;
    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const props: TransactionProps = {
            orderId: input.orderId,
            amount: input.amount
        };

        const transaction = new Transaction(props);

        transaction.process();

        const persistTransaction = await this._transactionRepository.save(transaction);

        const output: ProcessPaymentOutputDto = {
            id: persistTransaction.id.toString(),
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        };

        return output;
    }
}