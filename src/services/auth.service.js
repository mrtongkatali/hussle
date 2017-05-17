import axios from 'axios'

export default {
    welcome: () => axios.get("/"),
    register: (params) => axios.post("/1.0/auth/register", params).then( (data) => data.data ),
    login: (params) => axios.post("/1.0/auth/login", params).then( (data) => data.data ),
    logout: (params) => axios.post("/1.0/auth/logout", params).then( (data) => data.data )
}