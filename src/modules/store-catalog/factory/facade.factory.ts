import StoreCatalogFacade from "../facade/store-catalog.facade";
import StoreCatalogFacadeInterface from "../facade/store-catalog.facade.interface";
import ProductRepository from "../repository/sequelize/product.repository";
import FindAllProductsUseCase from "../use-case/find-all-products/find-all-products.use-case";
import FindProductUseCase from "../use-case/find-product/find-product.use-case";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacadeInterface {
        const productRepository = new ProductRepository();
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
        const findProductUseCase = new FindProductUseCase(productRepository);
        const storeCatalogFacade = new StoreCatalogFacade({ findAllProductsUseCase, findProductUseCase });

        return storeCatalogFacade;
    }
}