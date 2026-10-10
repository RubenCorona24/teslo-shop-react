
import { useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';



export const AdminProductPage = () => {
    const { id } = useParams(); //extraer id de parámetros
    const navigate = useNavigate()
    const { isLoading, isError, data: product, mutation } = useProduct(id ?? '') //consumir customHook
    console.log({ isLoading, product })
    console.log({ mutation: mutation.isPending })
    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';
    //TODO: Función para actualizar producto 
    const handleSubmit = async (productLike: Partial<Product> & { files?: File[] }) => {
        console.log(productLike)
        await mutation.mutateAsync(productLike, {
            onSuccess: (data) => {

                toast.success("Producto actualizado correctamente")
                navigate(`/admin/products/${data.id}`)
            },
            onError: (error) => {
                console.log("Error")
                toast.error(`Error: ${error}`)
            }
        })
    }

    //redirecciones
    if (isError) {
        navigate("/admin/products")
    }
    if (isLoading) return <CustomFullScreenLoading />
    if (!product) {
        navigate("/admin/products")
    }
    return <ProductForm title={title}
        subTitle={subtitle}
        product={product}
        onSubmit={handleSubmit}
        isPending={mutation.isPending}
    />



};
