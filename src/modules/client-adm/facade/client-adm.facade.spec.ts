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
            street: "Street",
            number: 1,
            complement: "2nd floor",
            city: "City",
            state: "State",
            zipcode: "00000"
        };

        const output = await clientAdmFacade.addClient(input);

        const clientDb = await ClientModel.findOne({
            where: { id: output.id }
        });

        expect(clientDb.toJSON()).toStrictEqual({
            id: expect.any(String),
            name: input.name,
            email: input.email,
            address_street: input.street,
            address_number: input.number,
            address_complement: input.complement,
            address_city: input.city,
            address_state: input.state,
            address_zipcode: input.zipcode,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })

    it("should find a client", async () => {
        const clientAdmFacade = ClientAdmFacadeFactory.create();

        const clientValues = {
            id: "c1",
            name: "Client 1",
            email: "client1@localhost.net",
            address_street: "Street",
            address_number: 1,
            address_complement: "2nd floor",
            address_city: "City",
            address_state: "State",
            address_zipcode: "00000",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await ClientModel.create(clientValues);

        const input: FindClientFacadeInputDto = {
            id: clientValues.id
        };

        const output = await clientAdmFacade.findClient(input);

        expect(output).toMatchObject({
            id: clientValues.id,
            name: clientValues.name,
            email: clientValues.email,
            street: clientValues.address_street,
            number: clientValues.address_number,
            complement: clientValues.address_complement,
            city: clientValues.address_city,
            state: clientValues.address_state,
            zipcode: clientValues.address_zipcode,
            createdAt: clientValues.createdAt,
            updatedAt: clientValues.updatedAt
        });
    })

    it("should not find a client", async () => {
        const clientAdmFacade = ClientAdmFacadeFactory.create();

        expect(async () => {
            const input: FindClientFacadeInputDto = {
                id: "ABCDE"
            };

            await clientAdmFacade.findClient(input);
        }).rejects.toThrow("Client not found");
    })
}))