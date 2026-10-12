    import axios from "axios";

    const HOT_COFFEES_URL = "https://api.sampleapis.com/coffee/hot";
    const ICED_COFFEES_URL = "https://api.sampleapis.com/coffee/iced";

    export class CoffeeApi {
        async getHotCoffees() {
            const response = await axios.get(HOT_COFFEES_URL);
            return response;
        }

        async getIcedCoffees() {
            const response = await axios.get(ICED_COFFEES_URL);
            return response;
        }
    }