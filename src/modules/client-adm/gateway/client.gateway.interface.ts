import Client from "../domain/entity/client.entity";

export default interface ClientGatewayInterface {
    add(client: Client): Promise<void>;
    find(id: string): Promise<Client>;
}
