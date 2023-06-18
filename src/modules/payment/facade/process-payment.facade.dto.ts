export interface ProcessPaymentFacadeInputDto {
    id?: string,
    orderId: string;
    amount: number;
}

export interface ProcessPaymentFacadeOutputDto {
    id: string;
    orderId: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
