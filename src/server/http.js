import axios from "axios"

const http = axios.create({
    baseURL:'https://latam-challenge-2.deta.dev/api/v1/'
})

export default http