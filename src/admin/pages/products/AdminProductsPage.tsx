import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const AdminProductsPage = () => {
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
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>
              <img
                src="/vite.svg"
                alt="Product Image"
                className="w-20 h-20 object-cover rounded-md"
              />
            </TableCell>
            <TableCell>Producto1</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>100 stock</TableCell>

            <TableCell>Categoria 1</TableCell>
            <TableCell>XS,S,L</TableCell>
            <TableCell className="text-right">
              {/* <Link to="t-shirt-teslo"> */}
              <Link to="/admin/products/t-shirt-teslo">
                Editar
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <CustomPagination totalPages={10} />

    </>
  )
}