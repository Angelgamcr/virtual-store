import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Product } from "@/interfaces/product.interface"
import { currencyFormatter } from "@/lib/currency-formatter"
import { useProducts } from "@/shop/hooks/useProducts"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const AdminProductsPage = () => {

  const { data, isLoading } = useProducts();

  if (isLoading) return <CustomFullScreenLoading />;
  return (
    <>
      <div className="flex justify-between items-center">

        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y administrar tus productos"
        />
      </div>
      <div className="flex justify-end mb-10 gap-4">

        <Link to={'/admin/products/new'} >
          <Button>
            <PlusIcon />
            Nuevo producto
          </Button>
        </Link>
      </div>
      <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            data!.products.map((product: Product) => (

              <TableRow>
                <TableCell>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/products/${product.id}`}
                    className="hover:text-blue-500 underline"
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>{currencyFormatter(product.price)}</TableCell>
                <TableCell>{product.gender}</TableCell>
                <TableCell>{product.stock} stock</TableCell>
                <TableCell>{product.sizes}</TableCell>
                <TableCell className="text-right">
                  {/* <Link to="t-shirt-teslo"> */}
                  <Link to={`/admin/products/${product.id}`}>
                    <PencilIcon className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <CustomPagination totalPages={10} />

    </>
  )
}