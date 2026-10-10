//TODO: Implementar la acción de registro

import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response"


export const registerAction = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>("/auth/register", { //endpoint
            email: email,
            password: password,
            fullName: fullName
        })

        return data //retornamos la data
    } catch (error) {
        console.error(error)
        throw error //lanzar error
    }
}