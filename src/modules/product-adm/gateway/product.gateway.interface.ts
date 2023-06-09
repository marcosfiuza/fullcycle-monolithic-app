import ProductEntity from "../domain/entity/product.entity";

export default interface ProductGatewayInterface {
    add(product: ProductEntity): Promise<void>;
    find(id: string): Promise<ProductEntity>;
}
