import { AddProductFacadeInputDto, AddProductFacadeOutputDto } from "./add-product.facade.dto";
import { CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./check-stock.facade.dto";

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
}
