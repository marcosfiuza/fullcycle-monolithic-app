import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { FindProductInputDto, FindProductOutputDto } from "./find-products.dto";

export default class FindProductUseCase implements UseCaseInterface {
    private _productRepository: ProductGatewayInterface;

    constructor(productRepository: ProductGatewayInterface) {
        this._productRepository = productRepository;
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const result = await this._productRepository.find(input.id);

        const output: FindProductOutputDto = {
            id: result.id.toString(),
            name: result.name,
            description: result.description,
            salesPrice: result.salesPrice
        };

        return output;
    }
}