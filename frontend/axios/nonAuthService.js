const axios = require('axios');

const createUser =  (payload) => {
    return axios
        .post('http://127.0.0.1:8000/api/v1/auth/register/', payload)
        
}


const getToken = async (payload) => {
    return axios
        .post('http://127.0.0.1:8000/api/v1/auth/token/', payload)
}

export default { createUser, getToken }
