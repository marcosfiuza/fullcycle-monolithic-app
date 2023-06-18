import AggregateRootInterface from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

export type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: string;
    items: Product[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRootInterface {
    private _name: string;
    private _document: string;
    private _address: string;
    private _items: Product[];

    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);

        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): string {
        return this._address;
    }

    get items(): Product[] {
        return this._items;
    }

    set name(name: string) {
        this._name = name;
    }

    set document(document: string) {
        this._document = document;
    }

    set address(address: string) {
        this._address = address;
    }

    set items(items: Product[]) {
        this._items = items;
    }
}
