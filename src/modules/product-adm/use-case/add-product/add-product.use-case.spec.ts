import { AddProductInputDto } from "./add-product.dto";
import AddProductUseCase from "./add-product.use-case";

const MockProductRepository = () => ({
    add: jest.fn(),
    find: jest.fn()
});

describe("Add product use case test", () => {
    it("should add a product", async () => {
        const productRepository = MockProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);

        const input: AddProductInputDto = {
            name: "Product 1",
            description: "Description",
            purchasePrice: 100,
            stock: 40
        };

        const result = await addProductUseCase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result).toStrictEqual({
            ...input,
            id: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })
})