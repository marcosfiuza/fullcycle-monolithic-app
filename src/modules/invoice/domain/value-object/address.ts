export type AddressProps = {
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
}

export default class Address {
    private _street: string;
    private _number: number = 0;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipcode: string;

    constructor(props: AddressProps) {
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement;
        this._city = props.city;
        this._state = props.state;
        this._zipcode = props.zipcode;
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipcode(): string {
        return this._zipcode;
    }

    set street(street) {
        this._street = street;
    }

    set number(number) {
        this._number = number;
    }

    set complement(complement) {
        this._complement = complement;
    }

    set city(city) {
        this._city = city;
    }

    set state(state) {
        this._state = this.state;
    }

    set zipcode(zipcode) {
        this._zipcode = zipcode;
    }
}
