import { Coffee } from "../domain/model/coffee.entity.js";

export class CoffeeAssembler {
    static toEntityFromResource(resource) {
        const coffee = new Coffee({ ...resource });
        return coffee;
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }

        let coffeeList = [];

        if (Array.isArray(response.data)) {
            coffeeList = response.data;
        }

        const coffeeEntities = [];
        for (const coffeeData of coffeeList) {
            const coffee = this.toEntityFromResource(coffeeData);
            coffeeEntities.push(coffee);
        }

        return coffeeEntities;
    }
}