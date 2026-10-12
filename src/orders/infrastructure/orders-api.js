import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

export class OrdersApi extends BaseApi {
    #locationsEndpoint;
    #ordersEndpoint;

    constructor() {
        super();

        const locationsPath = '/cafe-locations';
        const ordersPath = '/cafe-orders';

        this.#locationsEndpoint = new BaseEndpoint(this, locationsPath);
        this.#ordersEndpoint = new BaseEndpoint(this, ordersPath);
    }

    async getLocations() {
        const response = await this.#locationsEndpoint.getAll();
        return response;
    }

    async getOrders() {
        const response = await this.#ordersEndpoint.getAll();
        return response;
    }

    async createOrder(resource) {
        const response = await this.#ordersEndpoint.create(resource);
        return response;
    }
}