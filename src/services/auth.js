import axios from 'axios'
import qs from 'query-string'

//const API_SERVER = "http://localhost:8080"
const API_SERVER = "https://huzzl-api.herokuapp.com"

let loginHeader = {
    headers: { "Content-Type" : "application/x-www-form-urlencoded" }
}

export default {
    welcome: () => axios.get(API_SERVER + "/"),
    register: (params) => axios.post(API_SERVER + "/1.0/auth/register", params).then( (data) => data.data ),
    login: (params) => axios.post(API_SERVER + "/1.0/auth/login", qs.stringify(params), loginHeader).then( (data) => data.data )
}