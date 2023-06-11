import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/product.entity";
import FindProductUseCase from "./find-product.use-case";
import { FindProductInputDto } from "./find-products.dto";

const product = new Product({
    id: new Id("p1"),
    name: "Product 1",
    description: "Description",
    salesPrice: 100
});

const MockProductRepository = () => ({
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
});

describe("Find product use case test", () => {
    it("should find a product", async () => {
        const productRepository = MockProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input: FindProductInputDto = {
            id: "p1"
        };

        const output = await findProductUseCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output).toStrictEqual({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        });
    })

    it("should not find a product", async () => {
        const productRepository = MockProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const input: FindProductInputDto = {
            id: "ABCDE"
        };

        expect(async () => {
            await findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found");
    })
})
