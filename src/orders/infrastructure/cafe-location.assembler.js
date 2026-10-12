import { CafeLocation } from "../domain/model/cafe-location.entity.js";

export class CafeLocationAssembler {
    static toEntityFromResource(resource) {
        const location = new CafeLocation({ ...resource });
        return location;
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            return [];
        }

        const responseData = response.data;
        let locationList = responseData;

        if (!Array.isArray(responseData)) {
            locationList = responseData['cafe-locations'];
        }

        const locationEntities = [];
        for (const locationData of locationList) {
            const location = this.toEntityFromResource(locationData);
            locationEntities.push(location);
        }

        return locationEntities;
    }
}