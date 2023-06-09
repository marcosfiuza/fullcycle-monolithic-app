import Id from "../value-object/id.value-object";
import BaseEntity from "./base.entity"

describe("Unit test for base entity", () => {
    it("should instantiate a base entity", () => {
        const baseEntity = new BaseEntity();

        expect(baseEntity.id).toBeDefined();
        expect(baseEntity.id).toBeInstanceOf(Id);
        expect(baseEntity.createdAt).toBeDefined();
        expect(baseEntity.createdAt).toBeInstanceOf(Date);
        expect(baseEntity.updatedAt).toBeDefined();
        expect(baseEntity.updatedAt).toBeInstanceOf(Date);
    })

    it("should instantiate a base entity with a defined id", () => {
        const baseEntity = new BaseEntity(new Id("e1"));

        expect(baseEntity.id).toBeDefined();
        expect(baseEntity.id).toBeInstanceOf(Id);
        expect(baseEntity.id.toString()).toEqual("e1");
        expect(baseEntity.createdAt).toBeDefined();
        expect(baseEntity.createdAt).toBeInstanceOf(Date);
        expect(baseEntity.updatedAt).toBeDefined();
        expect(baseEntity.updatedAt).toBeInstanceOf(Date);
    })
})