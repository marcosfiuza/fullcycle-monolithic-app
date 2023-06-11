import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import Product from "../../domain/entity/product.entity";
import ProductModel from "./product.model";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class ProductRepository implements ProductGatewayInterface {
    async findAll(): Promise<Product[]> {
        const productsDb = await ProductModel.findAll();

        const products: Product[] = productsDb.map(productDb => new Product({
            id: new Id(productDb.id),
            name: productDb.name,
            description: productDb.description,
            salesPrice: productDb.salesPrice
        }));

        return products;
    }
}
