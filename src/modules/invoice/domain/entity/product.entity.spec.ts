import Id from "../../../@shared/domain/value-object/id.value-object";
import Product, { ProductProps } from "./product.entity";

const productProps: ProductProps = {
    id: new Id("p1"),
    name: "Product 1",
    price: 100
};

describe("Product entity test", () => {
    it("should instantiate a product", () => {
        const product = new Product(productProps);

        expect(product.id).toEqual(productProps.id);
        expect(product.name).toEqual(productProps.name);
        expect(product.price).toEqual(productProps.price);
    })

    it("should change a product name", () => {
        const product = new Product(productProps);

        expect(product.name).toEqual(productProps.name);

        product.name = "Product 2";

        expect(product.name).toEqual("Product 2");
    })

    it("should change a product price", () => {
        const product = new Product(productProps);

        expect(product.price).toEqual(productProps.price);

        product.price = 200;

        expect(product.price).toEqual(200);
    })
})