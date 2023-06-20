export interface FindInvoiceInputDto {
    id: string;
}

export interface FindInvoiceOutputDto {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: number;
        complement: string;
        city: string;
        state: string;
        zipcode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}
