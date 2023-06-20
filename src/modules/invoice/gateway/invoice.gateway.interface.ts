import Invoice from "../domain/entity/invoice.entity";

export default interface InvoiceGatewayInterface {
    add(Invoice: Invoice): Promise<void>;
    find(id: string): Promise<Invoice>;
}
