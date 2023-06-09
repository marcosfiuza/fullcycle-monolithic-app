import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import Product, { ProductProps } from "../../domain/entity/product.entity";
import ProductModel from "./product.model";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class ProductRepository implements ProductGatewayInterface {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });
    }

    async find(id: string): Promise<Product> {
        try {
            const productDb = await ProductModel.findOne({
                where: { id },
                rejectOnEmpty: true
            });

            const props: ProductProps = {
                id: new Id(productDb.id),
                name: productDb.name,
                description: productDb.description,
                purchasePrice: productDb.purchasePrice,
                stock: productDb.stock,
                createdAt: productDb.createdAt,
                updatedAt: productDb.updatedAt
            };

            const product = new Product(props);

            return product;
        } catch (err) {
            throw new Error("Product not found");
        }
    }
}