import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import Product, { ProductProps } from "../../domain/entity/product.entity";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase implements UseCaseInterface {
    private _productRepository: ProductGatewayInterface;

    constructor(productRepository: ProductGatewayInterface) {
        this._productRepository = productRepository;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const props: ProductProps = {
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        };

        const product = new Product(props);

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