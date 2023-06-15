import { AddClientFacadeInputDto, AddClientFacadeOutputDto } from "./add-client.facade.dto";
import { FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./find-client.facade.dto";

export default interface ClientAdmFacadeInterface {
    addClient(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto>;
    findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}
