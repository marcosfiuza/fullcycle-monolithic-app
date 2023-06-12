import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import { FindProductFacadeInputDto } from "./find-product.facade.dto";

const productValues = {
    id: "p1",
    name: "Product 1",
    description: "Description",
    salesPrice: 100
};

describe("Product adm facade test", (() => {
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
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find all products", async () => {
        const storeCatalogFacade = StoreCatalogFacadeFactory.create();

        await ProductModel.create(productValues);

        const output = await storeCatalogFacade.findAllProducts();

        expect(output).toMatchObject({
            products: [productValues]
        });
    })

    it("should find a product", async () => {
        const storeCatalogFacade = StoreCatalogFacadeFactory.create();

        await ProductModel.create(productValues);

        const input: FindProductFacadeInputDto = {
            id: productValues.id
        };

        const output = await storeCatalogFacade.findProduct(input);

        expect(output).toMatchObject(productValues);
    })

    it("should not find a product", async () => {
        const storeCatalogFacade = StoreCatalogFacadeFactory.create();

        expect(async () => {
            const input: FindProductFacadeInputDto = {
                id: "ABCDE"
            };

            await storeCatalogFacade.findProduct(input);
        }).rejects.toThrow("Product not found");
    })
}))
