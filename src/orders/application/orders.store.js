import { defineStore } from "pinia";
import { ref } from "vue";
import { OrdersApi } from "../infrastructure/orders-api.js";
import { CafeLocationAssembler } from "../infrastructure/cafe-location.assembler.js";
import { CafeOrderAssembler } from "../infrastructure/cafe-order.assembler.js";
import { CafeOrder } from "../domain/model/cafe-order.entity.js";

const ordersApi = new OrdersApi();

const useOrdersStore = defineStore('orders', () => {
    const locations = ref([]);
    const orders = ref([]);
    const errors = ref([]);

    async function fetchLocations() {
        try {
            const response = await ordersApi.getLocations();
            locations.value = CafeLocationAssembler.toEntitiesFromResponse(response);
        } catch (error) {
            errors.value.push(error);
        }
    }

    async function fetchOrders() {
        try {
            const response = await ordersApi.getOrders();
            orders.value = CafeOrderAssembler.toEntitiesFromResponse(response);
        } catch (error) {
            errors.value.push(error);
        }
    }

    async function addOrder(orderPayload) {
        const orderToSave = new CafeOrder(orderPayload);

        try {
            const response = await ordersApi.createOrder(orderToSave);
            const savedOrder = CafeOrderAssembler.toEntityFromResource(response.data);
            orders.value.push(savedOrder);
        } catch (error) {
            errors.value.push(error);
        }
    }

    function getLocationById(id) {
        const numericId = parseInt(id, 10);
        const location = locations.value.find(location => location.id === numericId);
        return location;
    }

    return {
        locations,
        orders,
        errors,
        fetchLocations,
        fetchOrders,
        addOrder,
        getLocationById
    };
});

export default useOrdersStore;