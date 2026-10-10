//acción de obtener el producto por id

import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

//acción asíncrona: recibe el id como string y devuelve una promesa tipo "Product"
export const getProductByIdAction = async (id: string): Promise<Product> => {
    //validar el id
    if (!id) throw new Error("ID is required") //lanzar error

    if (id === "new") {
        return {
            id: "new",
            title: "",
            price: 0,
            description: "",
            slug: '',
            stock: 0,
            sizes: [],
            gender: "men",
            tags: [],
            images: []
        } as unknown as Product
    }
    //en caso de tener id => llamamos a 
    const { data } = await tesloApi.get<Product>(`products/${id}`)
    const images = data.images.map(img => {
        if (img.includes("htttp")) return img;
        return `${import.meta.env.VITE_API_URL}/files/product/${img}`
    })
    return {
        ...data,
        images  //sobreescribimos imágenes
    }
}