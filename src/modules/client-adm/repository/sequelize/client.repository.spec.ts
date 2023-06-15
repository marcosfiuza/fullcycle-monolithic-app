import { Sequelize } from "sequelize-typescript";
import Client, { ClientProps } from "../../domain/entity/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe("Client sequelize repository test", () => {
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
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const clientRepository = new ClientRepository();

        const props: ClientProps = {
            name: "Client 1",
            email: "client1@locahost.net",
            address: "Street 1"
        };

        const client = new Client(props);

        await clientRepository.add(client);

        const clientDb = await ClientModel.findOne({
            where: { id: client.id.toString() }
        });

        expect(clientDb.toJSON()).toStrictEqual({
            id: client.id.toString(),
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    })

    it("should find a client", async () => {
        const clientRepository = new ClientRepository();

        const clientValues = {
            id: "p1",
            name: "Client 1",
            email: "client1@localhost.net",
            address: "Street 1",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await ClientModel.create(clientValues);

        const result = await clientRepository.find(clientValues.id);

        const client = {
            id: result.id.toString(),
            name: result.name,
            email: result.email,
            address: result.address,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };

        expect(client).toStrictEqual(clientValues);
    })

    it("should not find a client", async () => {
        const clientRepository = new ClientRepository();

        expect(async () => {
            await clientRepository.find("ABCDE");
        }).rejects.toThrow("Client not found");
    })
})
