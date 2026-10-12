import { defineStore } from "pinia";
import { ref } from "vue";
import { CoffeeApi } from "../infrastructure/coffee-api.js";
import { CoffeeAssembler } from "../infrastructure/coffee.assembler.js";

const coffeeApi = new CoffeeApi();

export const useOfferingsStore = defineStore('offerings', () => {
    const coffees = ref([]);
    const errors = ref([]);

    async function fetchCoffeesByType(coffeeType) {
        try {
            let response;

            if (coffeeType === 'iced') {
                response = await coffeeApi.getIcedCoffees();
            } else {
                response = await coffeeApi.getHotCoffees();
            }

            coffees.value = CoffeeAssembler.toEntitiesFromResponse(response);
            return coffees.value;
        } catch (error) {
            errors.value.push(error);
            return [];
        }
    }

    return {
        coffees,
        errors,
        fetchCoffeesByType
    };
});