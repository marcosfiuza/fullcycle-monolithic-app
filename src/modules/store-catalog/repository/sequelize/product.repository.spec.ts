import { Sequelize } from "sequelize-typescript";
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

    it("should find all products", async () => {
        const productRepository = new ProductRepository();

        const product1Values = {
            id: "p1",
            name: "Product 1",
            description: "Description",
            salesPrice: 100
        };

        const product2Values = {
            id: "p2",
            name: "Product 2",
            description: "Description",
            salesPrice: 200
        };

        await ProductModel.create(product1Values);
        await ProductModel.create(product2Values);

        const results = await productRepository.findAll();

        const produtcs = results.map(result => ({
            id: result.id.toString(),
            name: result.name,
            description: result.description,
            salesPrice: result.salesPrice
        }));

        expect(produtcs).toMatchObject([product1Values, product2Values]);
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const productValues = {
            id: "p1",
            name: "Product 1",
            description: "Description",
            salesPrice: 100
        };

        await ProductModel.create(productValues);

        const result = await productRepository.find(productValues.id);

        const product = {
            id: result.id.toString(),
            name: result.name,
            description: result.description,
            salesPrice: result.salesPrice
        };

        expect(product).toStrictEqual(productValues);
    })

    it("should not find a product", async () => {
        const productRepository = new ProductRepository();

        expect(async () => {
            await productRepository.find("ABCDE");
        }).rejects.toThrow("Product not found");
    })
})
