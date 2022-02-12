import axios from 'axios';
const service = axios.create({
    timeout: 20000 // request timeout
});

// request interceptor
const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
}

const getProducts = () => {
    return service.get('http://127.0.0.1:8000/api/v1/products/')
}

const createProduct = (payload) => {
    return service.post('http://127.0.0.1:8000/api/v1/products/', payload)
}

const getProductIngredientsSum = () => {
    return service.get('http://127.0.0.1:8000/api/v1/products/ingredients/')
}

service.interceptors.request.use(
    config => {
        // Do something before request is sent
        config.headers["Authorization"] = "Bearer " + getToken();
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default {
    getProducts, createProduct, getProductIngredientsSum
}