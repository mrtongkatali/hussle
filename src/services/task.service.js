import axios from 'axios'
import qs from 'query-string'

export default {
    createTask: (params) => axios.post("/1.0/task", params).then( (data) => data.data ),
    getAllTask: (query) => axios.get(`/1.0/task?${ qs.stringify(query) }`).then( (data) => data.data ),
    updateTask: (task_id, params) => axios.put(`/1.0/task/${task_id}`, params).then( (data) => data.data )
}