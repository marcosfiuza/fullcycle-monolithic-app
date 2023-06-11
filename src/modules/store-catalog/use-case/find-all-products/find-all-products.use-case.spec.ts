import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/product.entity";
import FindAllProductsUseCase from "./find-all-products.use-case";

const product1 = new Product({
    id: new Id("p1"),
    name: "Product 1",
    description: "Description",
    salesPrice: 100
});

const product2 = new Product({
    id: new Id("p2"),
    name: "Product 2",
    description: "Description",
    salesPrice: 200
});

const MockProductRepository = () => ({
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    find: jest.fn()
});

describe("Find all products use case test", () => {
    it("should find all products", async () => {
        const productRepository = MockProductRepository();
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

        const output = await findAllProductsUseCase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(output).toStrictEqual([{
            id: product1.id.toString(),
            name: product1.name,
            description: product1.description,
            salesPrice: product1.salesPrice
        }, {
            id: product2.id.toString(),
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice
        }]);
    })
})
