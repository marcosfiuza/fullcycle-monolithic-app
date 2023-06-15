import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/entity/client.entity";
import FindClientUseCase from "./find-client.use-case";
import { FindClientInputDto } from "./find-client.dto";

const client = new Client({
    id: new Id("p1"),
    name: "Client 1",
    email: "client1@localhost.net",
    address: "Street 1"
});

const MockClientRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client))
});

describe("Find client use case test", () => {
    it("should find a client", async () => {
        const clientRepository = MockClientRepository();
        const findClientUseCase = new FindClientUseCase(clientRepository);

        const input: FindClientInputDto = {
            id: "p1"
        };

        const output = await findClientUseCase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();
        expect(output).toStrictEqual({
            id: client.id.toString(),
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })

    it("should not find a client", async () => {
        const clientRepository = MockClientRepository();
        const findClientUseCase = new FindClientUseCase(clientRepository);

        clientRepository.find.mockImplementation(() => {
            throw new Error("Client not found");
        });

        const input: FindClientInputDto = {
            id: "ABCDE"
        };

        expect(async () => {
            await findClientUseCase.execute(input);
        }).rejects.toThrow("Client not found");
    })
})
