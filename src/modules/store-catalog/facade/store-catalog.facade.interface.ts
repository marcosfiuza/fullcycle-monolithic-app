import { FindAllProductsFacadeOutputDto } from "./find-all-products.facade.dto";
import { FindProductFacadeInputDto, FindProductFacadeOutputDto } from "./find-product.facade.dto";

export default interface ProductAdmFacadeInterface {
    findAllProducts(): Promise<FindAllProductsFacadeOutputDto>;
    findProduct(input: FindProductFacadeInputDto): Promise<FindProductFacadeOutputDto>;
}
