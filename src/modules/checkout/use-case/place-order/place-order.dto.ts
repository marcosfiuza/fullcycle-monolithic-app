export interface PlaceOrderInputDto {
    clientId: string;
    products: {
        productId: string
    }[];
}

export interface PlaceOrderOutputDto {
    id: string;
    invoiceId: string;
    products: {
        productId: string;
    }[];
    total: number;
    status: string;
}
