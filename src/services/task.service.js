import config from 'config'
import axios from 'axios'
import qs from 'query-string'
import store from 'store'

const API_SERVER = config.API_SERVER_URL

let defaultHeader = {
    headers: store.state.auth.headers
}

//console.log("default headers 1", defaultHeader)

export default {
    createTask: (params) => axios.post(API_SERVER + "/1.0/task", params, defaultHeader).then( (data) => data.data )
}