import type { Product } from "@/interfaces/product.interface"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUpdateProductAction } from "../actions/create-update-product.action"

export const useProduct = (id: string) => { //recibo id del producto
    const queryClient = useQueryClient()
    //tanStackQuery para peticiones http
    const query = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductByIdAction(id), //acción mandando id,
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
    //TODO: mutación => NO se manda instantáneamente
    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            console.log("Mutación exitosa", product) //regresa el resultado de la promesa
            //TODO: Invalidar caché y actualizar QueryData
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] })
            queryClient.setQueryData(['products', { id: product.id }], product)
        }
    })
    //TODO: Por eliminar
    //const handleSubmitForm = async (productLike: Partial<Product>) => { ///recibimos data de tipo Product
    //   console.log({ productLike })
    //}
    //retornamos la query y el handleSubmitForm
    return {
        ...query,
        //handleSubmitForm
        mutation
    }
}
