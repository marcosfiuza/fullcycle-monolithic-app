import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { FindAllProductsOutputDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
    private _productRepository: ProductGatewayInterface;

    constructor(productRepository: ProductGatewayInterface) {
        this._productRepository = productRepository;
    }

    async execute(): Promise<FindAllProductsOutputDto[]> {
        const results = await this._productRepository.findAll();

        const output: FindAllProductsOutputDto[] = results.map(product => ({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }));

        return output;
    }
}