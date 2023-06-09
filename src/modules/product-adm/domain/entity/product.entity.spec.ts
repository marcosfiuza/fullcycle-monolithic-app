import Id from "../../../@shared/domain/value-object/id.value-object";
import ProductEntity, { ProductEntityProps } from "./product.entity";

const productEntityProps: ProductEntityProps = {
    id: new Id("p1"),
    name: "Product 1",
    description: "Description",
    purchasePrice: 100,
    stock: 40,
    createdAt: new Date("2023-06-09 00:00:00"),
    updatedAt: new Date("2023-06-09 06:00:00")
};

describe("Unit test for product entity on product-adm module", () => {
    it("should instantiate a product entity", () => {
        const productEntity = new ProductEntity(productEntityProps);

        expect(productEntity.id).toEqual(productEntityProps.id);
        expect(productEntity.name).toEqual(productEntityProps.name);
        expect(productEntity.description).toEqual(productEntityProps.description);
        expect(productEntity.purchasePrice).toEqual(productEntityProps.purchasePrice);
        expect(productEntity.stock).toEqual(productEntityProps.stock);
        expect(productEntity.createdAt).toEqual(productEntityProps.createdAt);
        expect(productEntity.updatedAt).toEqual(productEntityProps.updatedAt);
    })

    it("should change a product entity name", () => {
        const productEntity = new ProductEntity(productEntityProps);

        expect(productEntity.name).toEqual(productEntityProps.name);

        productEntity.name = "Product 2";

        expect(productEntity.name).toEqual("Product 2");
    })

    it("should change a product entity description", () => {
        const productEntity = new ProductEntity(productEntityProps);

        expect(productEntity.description).toEqual(productEntityProps.description);

        productEntity.description = "New description";

        expect(productEntity.description).toEqual("New description");
    })

    it("should change a product entity purchase price", () => {
        const productEntity = new ProductEntity(productEntityProps);

        expect(productEntity.purchasePrice).toEqual(productEntityProps.purchasePrice);

        productEntity.purchasePrice = 200;

        expect(productEntity.purchasePrice).toEqual(200);
    })

    it("should change a product entity stock", () => {
        const productEntity = new ProductEntity(productEntityProps);

        expect(productEntity.stock).toEqual(productEntityProps.stock);

        productEntity.stock = 5;

        expect(productEntity.stock).toEqual(5);
    })
})