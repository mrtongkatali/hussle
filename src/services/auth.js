import config from 'config'
import axios from 'axios'
import qs from 'query-string'
import store from 'store'

const API_SERVER = config.API_SERVER_URL

let loginHeader = {
    headers: { "Content-Type" : "application/x-www-form-urlencoded" }
}

export default {
    welcome: () => axios.get(API_SERVER + "/"),
    register: (params) => axios.post(API_SERVER + "/1.0/auth/register", params).then( (data) => data.data ),
    login: (params) => axios.post(API_SERVER + "/1.0/auth/login", qs.stringify(params), loginHeader).then( (data) => data.data )
}