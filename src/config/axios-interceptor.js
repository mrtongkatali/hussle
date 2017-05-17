import config from 'config'
import axios from 'axios'

axios.defaults.baseURL = config.API_SERVER_URL

axios.defaults.headers.common["Cache-Control"] = "no-cache"