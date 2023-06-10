import Product from "../../domain/entity/product.entity";
import { CheckStockInputDto } from "./check-stock.dto";
import CheckStockUseCase from "./check-stock.use-case";

const product = new Product({
    name: "Product 1",
    description: "Description",
    purchasePrice: 100,
    stock: 40
});

const MockProductRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
});

describe("Check stock use case test", () => {
    it("should get stock of a product", async () => {
        const productRepository = MockProductRepository();
        const checkStockUseCase = new CheckStockUseCase(productRepository);

        const input: CheckStockInputDto = {
            id: product.id.toString()
        };

        const result = await checkStockUseCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result).toStrictEqual({
            ...input,
            stock: product.stock
        });
    })
})