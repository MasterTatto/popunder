import axios from "axios";

const BASE_URL = 'http://clickinder.com/'

export const api = () => {

    const instance = axios.create({
        baseURL: BASE_URL,
    });

    return instance;
}
