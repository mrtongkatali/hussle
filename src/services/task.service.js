import axios from 'axios'

export default {
    createTask: (params) => axios.post("/1.0/task", params).then( (data) => data.data )
}