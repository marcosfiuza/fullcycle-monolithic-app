import UseCaseInterface from "../../../@shared/use-case/use-case.interface";
import ClientGatewayInterface from "../../gateway/client.gateway.interface";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto";

export default class FindClientUseCase implements UseCaseInterface {
    private _clientRepository: ClientGatewayInterface;

    constructor(clientRepository: ClientGatewayInterface) {
        this._clientRepository = clientRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const result = await this._clientRepository.find(input.id);

        const output: FindClientOutputDto = {
            id: result.id.toString(),
            name: result.name,
            email: result.email,
            street: result.address.street,
            number: result.address.number,
            complement: result.address.complement,
            city: result.address.city,
            state: result.address.state,
            zipcode: result.address.zipcode,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        };

        return output;
    }
}
