import UseCaseInterface from "../../@shared/use-case/use-case.interface";
import { AddProductFacadeInputDto, AddProductFacadeOutputDto } from "./add-product.facade.dto";
import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./check-stock.facade.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export interface UseCasesProps {
    addProductUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addProductUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(props: UseCasesProps) {
        this._addProductUseCase = props.addProductUseCase;
        this._checkStockUseCase = props.checkStockUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto> {
        return await this._addProductUseCase.execute(input);
    }

    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return await this._checkStockUseCase.execute(input);
    }
}
