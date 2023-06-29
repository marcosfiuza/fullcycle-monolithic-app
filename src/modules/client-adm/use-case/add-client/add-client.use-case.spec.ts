import { AddClientInputDto } from "./add-client.dto";
import AddClientUseCase from "./add-client.use-case";

const MockClientRepository = () => ({
    add: jest.fn(),
    find: jest.fn()
});

describe("Add client use case test", () => {
    it("should add a client", async () => {
        const clientRepository = MockClientRepository();
        const addClientUseCase = new AddClientUseCase(clientRepository);

        const input: AddClientInputDto = {
            name: "Client 1",
            email: "client1@localhost.net",
            street: "Street",
            number: 1,
            complement: "2nd floor",
            city: "City",
            state: "State",
            zipcode: "00000"
        };

        const result = await addClientUseCase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(result).toStrictEqual({
            ...input,
            id: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    })
})