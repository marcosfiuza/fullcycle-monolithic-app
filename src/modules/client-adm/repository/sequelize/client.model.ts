import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "clients",
    timestamps: false
})
export default class ClientModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare email: string;

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
}