import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmFacadeInterface from "../facade/product-adm.facade.interface";
import ProductRepository from "../repository/sequelize/product.repository";
import AddProductUseCase from "../use-case/add-product/add-product.use-case";

export default class ProductAdmFacadeFactory {
    static create(): ProductAdmFacadeInterface {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const productAdmFacade = new ProductAdmFacade({
            addProductUseCase: addProductUseCase,
            checkStockUseCase: undefined
        });

        return productAdmFacade;
    }
}