import ClientAdmFacade from "../facade/client-adm.facade";
import ClientAdmFacadeInterface from "../facade/client-adm.facade.interface";
import ClientRepository from "../repository/sequelize/client.repository";
import AddClientUseCase from "../use-case/add-client/add-client.use-case";
import FindClientUseCase from "../use-case/find-client/find-client.use-case";

export default class ClientAdmFacadeFactory {
    static create(): ClientAdmFacadeInterface {
        const clientRepository = new ClientRepository();
        const addClientUseCase = new AddClientUseCase(clientRepository);
        const findClientUseCase = new FindClientUseCase(clientRepository);
        const clientAdmFacade = new ClientAdmFacade({ addClientUseCase, findClientUseCase });

        return clientAdmFacade;
    }
}