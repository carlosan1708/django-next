import axios from 'axios';
const service = axios.create({
    timeout: 20000 // request timeout
});

// request interceptor
const getToken = () =>{
    const token = localStorage.getItem('token');
    console.log(token)
    return token;
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

export default service;