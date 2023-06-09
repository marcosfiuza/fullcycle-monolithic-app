import ProductEntity, { ProductEntityProps } from "../../domain/entity/product.entity";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {
    private _productRepository: ProductGatewayInterface;

    constructor(productRepository: ProductGatewayInterface) {
        this._productRepository = productRepository;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const props: ProductEntityProps = {
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        };

        const product = new ProductEntity(props);

        this._productRepository.add(product);

        const output: AddProductOutputDto = {
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };

        return output;
    }
}