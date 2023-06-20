import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "./product.model";

@Table({
    tableName: "products",
    timestamps: false
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare address_street: string;

    @Column({ allowNull: false })
    declare address_number: number;

    @Column({ allowNull: false })
    declare address_complement: string;

    @Column({ allowNull: false })
    declare address_city: string;

    @Column({ allowNull: false })
    declare address_state: string;

    @Column({ allowNull: false })
    declare address_zipcode: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    @HasMany(() => ProductModel)
    declare items: ProductModel[];
}