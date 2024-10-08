import axios from "axios"


const axi = axios.create({
    baseURL: "https://fn27.vimlc.uz/"
})
axi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorizzation = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)




export default axi;