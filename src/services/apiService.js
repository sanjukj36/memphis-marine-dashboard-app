import { commonAPI } from "./commonAPI";

export const getWeatherData = async (state) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
    return await commonAPI('GET', url);
};

export const getCryptoPrices = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=CG-3iSu31KQKoB59Hz4E2hKH7Ap`;
    return await commonAPI('GET', url);
};

