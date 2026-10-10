import { tesloApi } from "@/api/tesloApi"
import type { ProductsResponse } from "@/interfaces/products.response"


//interfaz de opciones a nuestro action
interface Options {
    limit?: number | string
    offset?: number
    gender?: string
    sizes?: string
    minPrice?: number
    maxPrice?: number
    q?: string
}

//acción asíncrona a nuestro backend
export const getProductsAction = async (options: Options): Promise<ProductsResponse> => {
    const { limit, offset, gender, sizes, minPrice, maxPrice, q } = options
    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit, offset, gender, sizes, minPrice, maxPrice, q
        }
    }) //devuelve un ProductsResponse
    console.log(data)
    const productsWithImageUrl = data.products.map(p => ({
        ...p,
        images: p.images.map(
            image => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        )
    }))
    return {
        ...data,
        products: productsWithImageUrl
    } //retornamos data
}   