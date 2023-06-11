
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product, { ProductProps } from "./product.entity";

const productProps: ProductProps = {
    id: new Id("p1"),
    name: "Product 1",
    description: "Description",
    salesPrice: 100
};

describe("Product entity test", () => {
    it("should instantiate a product entity", () => {
        const product = new Product(productProps);

        expect(product.id).toEqual(productProps.id);
        expect(product.name).toEqual(productProps.name);
        expect(product.description).toEqual(productProps.description);
        expect(product.salesPrice).toEqual(productProps.salesPrice);
    })
})