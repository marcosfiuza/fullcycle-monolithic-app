import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface {
    private _productRepository: ProductGatewayInterface;

    constructor(productRepository: ProductGatewayInterface) {
        this._productRepository = productRepository;
    }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this._productRepository.find(input.id);

        const output: CheckStockOutputDto = {
            id: product.id.toString(),
            stock: product.stock,
        };

        return output;
    }
}
