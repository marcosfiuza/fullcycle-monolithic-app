import ClientGatewayInterface from "../../gateway/client.gateway.interface";
import Client, { ClientProps } from "../../domain/entity/client.entity";
import ClientModel from "./client.model";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/value-object/address";

export default class ClientRepository implements ClientGatewayInterface {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
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
    }

    async find(id: string): Promise<Client> {
        try {
            const clientDb = await ClientModel.findOne({
                where: { id },
                rejectOnEmpty: true
            });

            const props: ClientProps = {
                id: new Id(clientDb.id),
                name: clientDb.name,
                email: clientDb.email,
                address: new Address({
                    street: clientDb.address_street,
                    number: clientDb.address_number,
                    complement: clientDb.address_complement,
                    city: clientDb.address_city,
                    state: clientDb.address_state,
                    zipcode: clientDb.address_zipcode
                }),
                createdAt: clientDb.createdAt,
                updatedAt: clientDb.updatedAt
            };

            const client = new Client(props);

            return client;
        } catch (err) {
            throw new Error("Client not found");
        }
    }
}
