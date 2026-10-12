export class CafeLocation {
    constructor({ id = null, name = '', coffeeType = '', maxCapacity = 0 }) {
        this.id = id;
        this.name = name;
        this.coffeeType = coffeeType;
        this.maxCapacity = maxCapacity;
    }
}