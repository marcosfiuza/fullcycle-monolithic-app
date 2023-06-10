import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmFacadeInterface from "../facade/product-adm.facade.interface";
import ProductRepository from "../repository/sequelize/product.repository";
import AddProductUseCase from "../use-case/add-product/add-product.use-case";
import CheckStockUseCase from "../use-case/check-stock/check-stock.use-case";

export default class ProductAdmFacadeFactory {
    static create(): ProductAdmFacadeInterface {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkStockUseCase = new CheckStockUseCase(productRepository);
        const productAdmFacade = new ProductAdmFacade({ addProductUseCase, checkStockUseCase });

        return productAdmFacade;
    }
}