import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminTitle } from "../components/AdminTitle"
import { Link } from "react-router"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@base-ui/react/button"
import { PlusIcon } from "lucide-react"
import { useProducts } from "@/shop/hooks/useProducts"

export const AdminProductsPage = () => {
    //consumir el hook
    const { data } = useProducts()

    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle title="Productos" description="Encuentra tus productos" />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to={'/admin/products/new'}>
                        <Button>
                            <PlusIcon />
                            Nuevo Producto
                        </Button>
                    </Link>
                </div>

            </div>


            <Table className="bg-white p-10 shadow-xs border-gray 200 mb-10">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.products.map(p => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">1</TableCell>
                                <TableCell>
                                    <img src={p.images[0]} alt="producto " className="w-20 h-20 object-cover rounded-md" />
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/products/${p.id}`}
                                        className="hover:text-blue-500 underline">{p.title}</Link>
                                </TableCell>
                                <TableCell>${p.price}</TableCell>
                                <TableCell>{p.gender}</TableCell>
                                <TableCell>{p.stock} stock</TableCell>
                                <TableCell>{p.sizes}</TableCell>
                                <TableCell className="text-right">
                                    <Link to={`/admin/products/${p.id}`}>Editar</Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

            <CustomPagination totalPages={data?.pages ?? 0} />
        </>
    )
}
