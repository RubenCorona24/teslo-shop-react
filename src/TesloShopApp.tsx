import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { type PropsWithChildren } from "react"
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading"
import { useAuthStore } from "./auth/store/auth.store"
const queryClient = new QueryClient() //creamos nuestro queryClient 

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
    const { checkAuthStatus } = useAuthStore()
    const { isLoading, data } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus, //no recibe argumentos
        retry: false,
        refetchInterval: 1000 * 60 * 1.5, //revalida el token cada hora y media
        refetchOnWindowFocus: true
    })
    console.log({ data })
    if (isLoading) return <CustomFullScreenLoading />
    return children //retornamos componente hijo
}
export const TesloShopApp = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            {/*Custom Provider */}
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            {/* The rest of your application */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

    )
}
