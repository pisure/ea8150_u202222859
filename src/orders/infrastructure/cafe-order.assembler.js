import { CafeOrder } from "../domain/model/cafe-order.entity.js";

export class CafeOrderAssembler {
    static toEntityFromResource(resource) {
        const order = new CafeOrder({ ...resource });
        return order;
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            return [];
        }

        const responseData = response.data;
        let orderList = responseData;

        if (!Array.isArray(responseData)) {
            orderList = responseData['cafe-orders'];
        }

        const orderEntities = [];
        for (const orderData of orderList) {
            const order = this.toEntityFromResource(orderData);
            orderEntities.push(order);
        }

        return orderEntities;
    }
}