import axios from "axios";

class WeatherService {
    async get(latitude: number, longitude: number) {
        const url: string = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`;
        const response = await axios.get(url);
        return response.data;
    }
};

const weatherService: WeatherService = new WeatherService();
export default weatherService;
