import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/sequelize/client.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import { AddClientFacadeInputDto } from "./add-client.facade.dto";
import { FindClientFacadeInputDto } from "./find-client.facade.dto";

describe("Client adm facade test", (() => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ClientModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a client", async () => {
        const clientAdmFacade = ClientAdmFacadeFactory.create();

        const input: AddClientFacadeInputDto = {
            name: "Client 1",
            email: "client1@localhost.net",
            address: "Street 1"
        };

        const output = await clientAdmFacade.addClient(input);

        const clientDb = await ClientModel.findOne({
            where: { id: output.id }
        });

        expect(clientDb.toJSON()).toStrictEqual({
            id: expect.any(String),
            name: input.name,
            email: input.email,
            address: input.address,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })

    it("should find a client", async () => {
        const storeCatalogFacade = ClientAdmFacadeFactory.create();

        const clientValues = {
            id: "c1",
            name: "Client 1",
            email: "client1@localhost.net",
            address: "Street 1",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await ClientModel.create(clientValues);

        const input: FindClientFacadeInputDto = {
            id: clientValues.id
        };

        const output = await storeCatalogFacade.findClient(input);

        expect(output).toMatchObject(clientValues);
    })

    it("should not find a client", async () => {
        const storeCatalogFacade = ClientAdmFacadeFactory.create();

        expect(async () => {
            const input: FindClientFacadeInputDto = {
                id: "ABCDE"
            };

            await storeCatalogFacade.findClient(input);
        }).rejects.toThrow("Client not found");
    })
}))