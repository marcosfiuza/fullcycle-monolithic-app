import { Sequelize } from "sequelize-typescript";
import Client, { ClientProps } from "../../domain/entity/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";
import Address from "../../domain/value-object/address";

const address = new Address({
    street: "Street",
    number: 1,
    complement: "2nd floor",
    city: "City",
    state: "State",
    zipcode: "00000"
});

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
            address: address
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
            address_street: client.address.street,
            address_number: client.address.number,
            address_complement: client.address.complement,
            address_city: client.address.city,
            address_state: client.address.state,
            address_zipcode: client.address.zipcode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    })

    it("should find a client", async () => {
        const clientRepository = new ClientRepository();

        const values = {
            id: "p1",
            name: "Client 1",
            email: "client1@localhost.net",
            address_street: "Street",
            address_number: 1,
            address_complement: "2nd floor",
            address_city: "City",
            address_state: "State",
            address_zipcode: "000000",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await ClientModel.create(values);

        const result = await clientRepository.find(values.id);

        const client = {
            id: result.id.toString(),
            name: result.name,
            email: result.email,
            address_street: result.address.street,
            address_number: result.address.number,
            address_complement: result.address.complement,
            address_city: result.address.city,
            address_state: result.address.state,
            address_zipcode: result.address.zipcode,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };

        expect(client).toStrictEqual(values);
    })

    it("should not find a client", async () => {
        const clientRepository = new ClientRepository();

        expect(async () => {
            await clientRepository.find("ABCDE");
        }).rejects.toThrow("Client not found");
    })
})
