import UseCaseInterface from "../../@shared/use-case/use-case.interface";
import { FindAllProductsFacadeOutputDto } from "./find-all-products.facade.dto";
import { FindProductFacadeInputDto, FindProductFacadeOutputDto } from "./find-product.facade.dto";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";

export interface UseCasesProps {
    findAllProductsUseCase: UseCaseInterface;
    findProductUseCase: UseCaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findAllProductsUseCase: UseCaseInterface;
    private _findProductUseCase: UseCaseInterface;

    constructor(props: UseCasesProps) {
        this._findAllProductsUseCase = props.findAllProductsUseCase;
        this._findProductUseCase = props.findProductUseCase;
    }

    async findAllProducts(): Promise<FindAllProductsFacadeOutputDto> {
        const products = await this._findAllProductsUseCase.execute({});
        return { products };
    }

    async findProduct(input: FindProductFacadeInputDto): Promise<FindProductFacadeOutputDto> {
        return await this._findProductUseCase.execute(input);
    }
}
