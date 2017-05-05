import axios from 'axios';

//const API_SERVER = "http://localhost:8080"
const API_SERVER = "https://huzzl-api.herokuapp.com"

export default {
    welcome: () => axios.get(API_SERVER + "/"),
    register: (params) => axios.post(API_SERVER + "/1.0/auth/register", params)
}