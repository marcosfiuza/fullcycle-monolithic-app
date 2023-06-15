import ClientGatewayInterface from "../../gateway/client.gateway.interface";
import Client, { ClientProps } from "../../domain/entity/client.entity";
import ClientModel from "./client.model";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class ClientRepository implements ClientGatewayInterface {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.toString(),
            name: client.name,
            email: client.email,
            address: client.address,
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
                address: clientDb.address,
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
