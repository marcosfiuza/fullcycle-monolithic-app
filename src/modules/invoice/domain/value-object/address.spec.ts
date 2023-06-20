import Address, { AddressProps } from "./address";

const addressProps: AddressProps = {
    street: "Street",
    number: 1,
    complement: "2nd floor",
    city: "City",
    state: "State",
    zipcode: "00000"
};

describe("Address value object test", () => {
    it("should instantiate an address", () => {
        const address = new Address(addressProps);

        expect(address.street).toEqual(addressProps.street);
        expect(address.number).toEqual(addressProps.number);
        expect(address.complement).toEqual(addressProps.complement);
        expect(address.city).toEqual(addressProps.city);
        expect(address.state).toEqual(addressProps.state);
        expect(address.zipcode).toEqual(addressProps.zipcode);
    })
})
