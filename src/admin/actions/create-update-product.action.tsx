//acción de crear o actualizar un producto

import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (productLike: Partial<Product> & { files?: File[] }): Promise<Product> => {
    await sleep(1500)
    //extraer información del productLike
    const { id, user, images = [], files = [], ...rest } = productLike;

    const isCreating = id === "new"
    //transformar strings a números
    rest.price = Number(rest.price || 0)
    rest.stock = Number(rest.stock || 0)

    //preparar las imágenes
    if (files.length > 0) {
        const newImageNames = await uploadFiles(files)
        images.push(...newImageNames)
    }
    const imagesToSave = images.map(img => {
        if (img.includes("http")) return img.split("/").pop();
        return img
    })

    //endpoint para actualizar info de producto (PATCH o POST dependiendo del isCreating)
    const { data } = await tesloApi({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imagesToSave
        }
    })
    //reconstruir la data con las imágenes
    const imagesWithUrl = data.images.map((img: string | string[]) => {
        if (img.includes("htttp")) return img;
        return `${import.meta.env.VITE_API_URL}/files/product/${img}`
    })
    return {
        ...data,
        images: imagesWithUrl
    }
}

export interface FileUploadResponse {
    secureUrl: string;
    fileName: string;
}

//función asíncrona para cargar archivos
const uploadFiles = async (files: File[]) => {

    const uploadPromises = files.map(async file => {
        const formData = new FormData()
        formData.append("file", file)
        const { data } = await tesloApi.post<FileUploadResponse>("/files/product", formData) //petición HTTP post 
        return data.fileName //retornamos el nombre del archivo


    })
    const uploadedFileNames = await Promise.all(uploadPromises)
    return uploadedFileNames
}