import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';
import { registerAction } from '../actions/register.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking' //creamos el tipo de estado

type AuthState = {
    //Properties (solo lectura)
    user: User | null,
    token: string | null,
    authStatus: AuthStatus

    //Getters
    isAdmin: () => boolean;

    //Actions (actualiza el state)
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void;
    register: (email: string, password: string, fullName: string) => Promise<boolean>
    checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    //Implementación del store
    user: null,
    token: null,
    authStatus: 'checking',

    //Getters
    isAdmin: () => {
        //saber si existe un usuario
        const roles = get().user?.roles || []; //extraer los roles del usuario mediante el get
        return roles.includes("admin") //retorna true o false 
        //return !!get().user.roles.includes("admin") => en una sola línea
    },

    //Actions
    login: async (email: string, password: string) => {
        console.log({ email, password })
        try { //si todo sale bien => true
            const data = await loginAction(email, password) //llamamos a nuestra acción
            localStorage.setItem("token", data.token)

            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true
        } catch (error) { //si hay error => false
            localStorage.removeItem("token")
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false
        }

    },
    register: async (email: string, password: string, fullName: string) => {
        try {
            const data = await registerAction(email, password, fullName) //llamamos a la acción register
            localStorage.setItem("token", data.token)
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true
        } catch (error) {
            localStorage.removeItem("token")
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false
        }
    },
    logout: () => {
        localStorage.removeItem("token") //borramos el token del localstorage
        set({ user: null, token: null, authStatus: 'not-authenticated' })
        console.log("Sesión de usuario cerrada...")
    },
    checkAuthStatus: async () => {
        try {
            //usar nuestra acción
            const { token, user } = await checkAuthAction()
            set({
                user, token
            })
            return true
        } catch (error) {
            console.error(error)
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            })
            return false
        }
    }
}))

