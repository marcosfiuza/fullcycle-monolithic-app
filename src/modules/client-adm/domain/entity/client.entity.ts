import AggregateRootInterface from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

export type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRootInterface {
    private _name: string;
    private _email: string;
    private _address: string;

    constructor(props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt);

        this._name = props.name;
        this._email = props.email;
        this._address = props.address;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get address(): string {
        return this._address;
    }

    set name(name: string) {
        this._name = name;
    }

    set email(email: string) {
        this._email = email;
    }

    set address(address: string) {
        this._address = address;
    }
}