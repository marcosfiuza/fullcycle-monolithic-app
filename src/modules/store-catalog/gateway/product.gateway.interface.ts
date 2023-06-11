import Product from "../domain/entity/product.entity";

export default interface ProductGatewayInterface {
    findAll(): Promise<Product[]>;
    find(id: string): Promise<Product>;
}
