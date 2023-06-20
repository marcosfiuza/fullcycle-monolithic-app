import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/sequelize/invoice.repository";
import GenerateInvoiceUseCase from "../use-case/generate-invoice/generate-invoice.use-case";
import FindInvoiceUseCase from "../use-case/find-invoice/find-invoice.use-case";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
        const invoiceFacade = new InvoiceFacade({ generateInvoiceUseCase, findInvoiceUseCase });

        return invoiceFacade;
    }
}
