import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { AddProductFacadeInputDto } from "./add-product.facade.dto";
import { CheckStockFacadeInputDto } from "./check-stock.facade.dto";

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

    it("should create a product", async () => {
        const productAdmFacade = ProductAdmFacadeFactory.create();

        const input: AddProductFacadeInputDto = {
            name: "Product 1",
            description: "Description",
            purchasePrice: 100,
            stock: 40
        };

        const output = await productAdmFacade.addProduct(input);

        const productDb = await ProductModel.findOne({
            where: { id: output.id }
        });

        expect(productDb.toJSON()).toStrictEqual({
            id: expect.any(String),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })

    it("should get stock of a product", async () => {
        const productAdmFacade = ProductAdmFacadeFactory.create();

        const product = await productAdmFacade.addProduct({
            id: "p1",
            name: "Product 1",
            description: "Description",
            purchasePrice: 100,
            stock: 40
        });

        const input: CheckStockFacadeInputDto = {
            id: "p1"
        };

        const output = await productAdmFacade.checkStock(input);

        expect(output).toStrictEqual({
            id: "p1",
            stock: 40
        });
    })
}))