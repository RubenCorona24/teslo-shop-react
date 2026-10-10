//api de nuestra aplicación

import axios from 'axios'

const tesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //extraemos nuetra URL 

})
//TODO: Interceptores
tesloApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("token")
    if (token) {
        //añadir token a los headers
        config.headers.Authorization = `Bearer ${token}`
    }
    return config; //retornamos la configuración
})
export { tesloApi }