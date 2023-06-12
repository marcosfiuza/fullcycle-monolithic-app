export interface FindAllProductsFacadeOutputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[]
}
