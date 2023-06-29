export interface FindClientInputDto {
    id: string;
}

export interface FindClientOutputDto {
    id: string;
    name: string;
    email: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
    createdAt: Date;
    updatedAt: Date;
}
