//acción de checar autenticación
import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response"

export const checkAuthAction = async (): Promise<AuthResponse> => {
    const token = localStorage.getItem("token") //extraemos el token del localstorage
    //validar existencia del token
    if (!token) throw new Error("No token found")
    try {
        const { data } = await tesloApi.get<AuthResponse>("/auth/check-status") //extraemos data del endpoint
        localStorage.setItem("token", data.token)
        return data;
    } catch (error) {
        console.error(error)
        localStorage.removeItem("token") //removemos el token
        throw new Error("Token expired or not valid")
    }
}