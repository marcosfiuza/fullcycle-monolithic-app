import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import Client, { ClientProps } from "../../domain/entity/client.entity";
import Address from "../../domain/value-object/address";
import ClientGatewayInterface from "../../gateway/client.gateway.interface";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.dto";

export default class AddClientUseCase implements UseCaseInterface {
    private _clientRepository: ClientGatewayInterface;

    constructor(clientRepository: ClientGatewayInterface) {
        this._clientRepository = clientRepository;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props: ClientProps = {
            id: new Id(input.id),
            name: input.name,
            email: input.email,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipcode: input.zipcode
            })
        };

        const client = new Client(props);

        this._clientRepository.add(client);

        const output: AddClientOutputDto = {
            id: client.id.toString(),
            name: client.name,
            email: client.email,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipcode: client.address.zipcode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };

        return output;
    }
}