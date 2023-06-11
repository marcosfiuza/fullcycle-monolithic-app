import Product from "../domain/entity/product.entity";

export default interface ProductGatewayInterface {
    findAll(): Promise<Product[]>;
}
