import { useAuthStore } from "@/auth/store/auth.store"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router"

//componente HOC (High Order Component) que envuelve el children
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
    //desestructurar el authStatus de nuestro gestor de estado (zustand)
    const { authStatus } = useAuthStore()
    //verificar el status
    if (authStatus === "checking") return null
    if (authStatus === "not-authenticated") return <Navigate to={"/auth/login"} /> //re-direccionamos a login

    return children //si está autenticado regresa children
}

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
    //desestructurar el authStatus de nuestro gestor de estado (zustand)
    const { authStatus } = useAuthStore()
    //verificar el status
    if (authStatus === "checking") return null
    if (authStatus === "authenticated") return <Navigate to={"/"} /> //re-direccionamos al home

    return children //si está autenticado regresa children
}
//Componente de roles de administrador
export const AdminRoute = ({ children }: PropsWithChildren) => {
    //desestructurar el authStatus de nuestro gestor de estado (zustand)
    const { authStatus, isAdmin } = useAuthStore()
    //verificar el status
    if (authStatus === "checking") return null
    if (authStatus === "not-authenticated") return <Navigate to={"/auth/login"} />
    //Caso de no ser administrador
    if (!isAdmin()) return <Navigate to={"/"} /> //re-direccionamos al home

    return children //si tiene rol de administrador
}