import Id from "../value-object/id.value-object";
import BaseEntity from "./base.entity"

describe("Base entity test", () => {
    it("should instantiate a base entity", () => {
        const baseEntity = new BaseEntity();

        expect(baseEntity.id).toBeDefined();
        expect(baseEntity.id).toBeInstanceOf(Id);
        expect(baseEntity.createdAt).toBeDefined();
        expect(baseEntity.createdAt).toBeInstanceOf(Date);
        expect(baseEntity.updatedAt).toBeDefined();
        expect(baseEntity.updatedAt).toBeInstanceOf(Date);
    })

    it("should instantiate a base entity with a defined id, created at and updated at", () => {
        const baseEntity = new BaseEntity(
            new Id("e1"),
            new Date("2023-06-09 00:00:00"),
            new Date("2023-06-09 06:00:00")
        );

        expect(baseEntity.id).toBeDefined();
        expect(baseEntity.id).toBeInstanceOf(Id);
        expect(baseEntity.id).toEqual(new Id("e1"));
        expect(baseEntity.createdAt).toBeDefined();
        expect(baseEntity.createdAt).toBeInstanceOf(Date);
        expect(baseEntity.createdAt).toEqual(new Date("2023-06-09 00:00:00"));
        expect(baseEntity.updatedAt).toBeDefined();
        expect(baseEntity.updatedAt).toBeInstanceOf(Date);
        expect(baseEntity.updatedAt).toEqual(new Date("2023-06-09 06:00:00"));
    })
})