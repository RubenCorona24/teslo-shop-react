import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJombotron } from "@/shop/components/CustomJombotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {
    //desestructuramos el useProducts (custom hook)
    const { data } = useProducts()


    return (
        <div>
            <CustomJombotron title="Todos los procuctos" />
            <ProductsGrid products={data?.products ?? []} />
            <CustomPagination totalPages={data?.pages ?? 0} />
        </div>
    )
}

