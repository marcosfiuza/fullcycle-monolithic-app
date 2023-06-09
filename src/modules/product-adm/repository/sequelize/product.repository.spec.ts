import { Sequelize } from "sequelize-typescript";
import Product, { ProductProps } from "../../domain/entity/product.entity";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product sequelize repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();

        const props: ProductProps = {
            name: "Product 1",
            description: "Description",
            purchasePrice: 100,
            stock: 40
        };

        const product = new Product(props);

        await productRepository.add(product);

        const productDb = await ProductModel.findOne({
            where: { id: product.id.toString() }
        });

        expect(productDb.toJSON()).toStrictEqual({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const values = {
            id: "p1",
            name: "Product 1",
            description: "Description",
            purchasePrice: 100,
            stock: 40,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await ProductModel.create(values);

        const product = await productRepository.find(values.id);

        expect(values).toStrictEqual({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.createdAt
        });
    });

    it("should throw an error when a product is not found", async () => {
        const productRepository = new ProductRepository();

        expect(async () => {
            await productRepository.find("ABCDEF");
        }).rejects.toThrow("Product not found");
    });
})