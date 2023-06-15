import UseCaseInterface from "../../@shared/use-case/use-case.interface";
import { AddClientFacadeInputDto, AddClientFacadeOutputDto } from "./add-client.facade.dto";
import { FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./find-client.facade.dto";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";

export interface UseCasesProps {
    addClientUseCase: UseCaseInterface;
    findClientUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _addClientUseCase: UseCaseInterface;
    private _findClientUseCase: UseCaseInterface;

    constructor(props: UseCasesProps) {
        this._addClientUseCase = props.addClientUseCase;
        this._findClientUseCase = props.findClientUseCase;
    }

    async addClient(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
        return await this._addClientUseCase.execute(input);
    }

    async findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findClientUseCase.execute(input);
    }
}
