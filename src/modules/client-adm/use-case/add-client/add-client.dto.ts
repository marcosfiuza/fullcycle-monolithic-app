export interface AddClientInputDto {
    id?: string,
    name: string;
    email: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
}

export interface AddClientOutputDto {
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
