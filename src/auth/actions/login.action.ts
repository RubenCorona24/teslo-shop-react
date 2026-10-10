//acción de acceder a los datos del login

import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response"


export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
            email: email,
            password: password
        })

        return data //retornamos la data
    } catch (error) {
        console.error(error)
        throw error //lanzar error
    }
}