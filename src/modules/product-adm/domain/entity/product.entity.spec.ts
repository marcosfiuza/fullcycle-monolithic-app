import Id from "../../../@shared/domain/value-object/id.value-object";
import Product, { ProductProps } from "./product.entity";

const productProps: ProductProps = {
    id: new Id("p1"),
    name: "Product 1",
    description: "Description",
    purchasePrice: 100,
    stock: 40,
    createdAt: new Date(),
    updatedAt: new Date()
};

describe("Product entity test", () => {
    it("should instantiate a product entity", () => {
        const product = new Product(productProps);

        expect(product.id).toEqual(productProps.id);
        expect(product.name).toEqual(productProps.name);
        expect(product.description).toEqual(productProps.description);
        expect(product.purchasePrice).toEqual(productProps.purchasePrice);
        expect(product.stock).toEqual(productProps.stock);
        expect(product.createdAt).toEqual(productProps.createdAt);
        expect(product.updatedAt).toEqual(productProps.updatedAt);
    })

    it("should change a product entity name", () => {
        const product = new Product(productProps);

        expect(product.name).toEqual(productProps.name);

        product.name = "Product 2";

        expect(product.name).toEqual("Product 2");
    })

    it("should change a product entity description", () => {
        const product = new Product(productProps);

        expect(product.description).toEqual(productProps.description);

        product.description = "New description";

        expect(product.description).toEqual("New description");
    })

    it("should change a product entity purchase price", () => {
        const product = new Product(productProps);

        expect(product.purchasePrice).toEqual(productProps.purchasePrice);

        product.purchasePrice = 200;

        expect(product.purchasePrice).toEqual(200);
    })

    it("should change a product entity stock", () => {
        const product = new Product(productProps);

        expect(product.stock).toEqual(productProps.stock);

        product.stock = 5;

        expect(product.stock).toEqual(5);
    })
})