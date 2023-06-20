import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "invoice_products",
    timestamps: false
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoice_id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

    @BelongsTo(() => InvoiceModel)
    declare invoice: Awaited<InvoiceModel>;
}
