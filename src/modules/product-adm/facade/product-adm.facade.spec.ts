import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model";
import ProductRepository from "../repository/sequelize/product.repository";
import AddProductUseCase from "../use-case/add-product/add-product.use-case";
import ProductAdmFacade from "./product-adm.facade";
import { AddProductFacadeInputDto } from "./add-product.facade.dto";
import ProductAdmFacadeFactory from "../factory/facade.factory";

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
}))