import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import Client, { ClientProps } from "./client.entity";

const address = new Address({
    street: "Street",
    number: 1,
    complement: "2nd floor",
    city: "City",
    state: "State",
    zipcode: "00000"
});

const clientProps: ClientProps = {
    id: new Id("p1"),
    name: "Client 1",
    email: "client1@localhost.net",
    address: address
};

describe("Client entity test", () => {
    it("should instantiate a client entity", () => {
        const client = new Client(clientProps);

        expect(client.id).toEqual(clientProps.id);
        expect(client.name).toEqual(clientProps.name);
        expect(client.email).toEqual(clientProps.email);
        expect(client.address).toEqual(clientProps.address);
    })

    it("should change a client entity name", () => {
        const client = new Client(clientProps);

        expect(client.name).toEqual(clientProps.name);

        client.name = "Client 2";

        expect(client.name).toEqual("Client 2");
    })

    it("should change a client entity email", () => {
        const client = new Client(clientProps);

        expect(client.email).toEqual(clientProps.email);

        client.email = "client2@localhost.net";

        expect(client.email).toEqual("client2@localhost.net");
    })

    it("should change a client entity address", () => {
        const client = new Client(clientProps);

        expect(client.address).toEqual(clientProps.address);

        const newAddress = new Address({
            street: "Avenue",
            number: 2,
            complement: "3rd floor",
            city: "New city",
            state: "New state",
            zipcode: "00001"
        });

        client.address = newAddress;

        expect(client.address).toEqual(newAddress);
    })
})