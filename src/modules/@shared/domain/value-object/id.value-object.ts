import { v4 as uuidv4 } from "uuid";
import ValueObjectInterface from "./value-object.interface";

export default class Id implements ValueObjectInterface {
    private _id: string;

    constructor(id?: string) {
        this._id = id || uuidv4();
    }

    toString(): string {
        return this._id;
    }
}