import axios from "axios";

const server = process.env.REACT_APP_RESTAURANT_URL;
const key = process.env.REACT_APP_API_KEY;

export const getKoreanMenuAPI = async () => {
    try {
        const res = await axios.get(`${server}/api/menu/korean?serviceKey=${key}`);
        if (res.data?.body) {
            return res.data.body;
        }
    } catch (err) {
        console.error(err);
    }
};

export const getRestaurantsAPI = async () => {
    try {
        const res = await axios.get(`${server}/api/rstr?serviceKey=${key}`);
        if (res.data?.body) {
            return res.data.body;
        }
    } catch (err) {
        console.error(err);
    }
};

export const getRestaurantImgAPI = async () => {
    try {
        const res = await axios.get(`${server}/api/rstr/img?serviceKey=${key}`);
        if (res.data?.body) {
            return res.data.body;
        }
    } catch (err) {
        console.error(err);
    }
};
