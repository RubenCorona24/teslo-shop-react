import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJombotron } from "@/shop/components/CustomJombotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"
import { useParams } from "react-router"

export const GenderPage = () => {
    const { gender } = useParams() //desestructuramos el gender de los 
    const { data } = useProducts();
    const genderLabel = gender === 'men' ? 'Hombres' : gender === "women" ? 'Mujeres' : 'Niños'
    return (
        <div>
            <CustomJombotron title={`Productos ideales para ${genderLabel}`} />
            <ProductsGrid products={data?.products ?? []} />
            <CustomPagination totalPages={data?.pages ?? 1} />
        </div>
    )
}
