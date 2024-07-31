import { MoreHorizontal, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link } from "react-router-dom";
import { useRef } from "react";

import ReactToPrint from "react-to-print";
import { toast } from "sonner";
import { useDeleteInvoiceMutation, useGetInvoicesQuery } from "@/api/invoices-slice";

export function Invoices() {
  const {data:invoices,isSuccess} = useGetInvoicesQuery({});
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const componentRef = useRef(null);


  const handleDelete = async (id: number) => {
    try {
      await deleteInvoice(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="ml-auto flex items-center gap-2">
        <ReactToPrint
          trigger={() => {
            return (
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            );
          }}
          content={() => componentRef.current}
          documentTitle="All Invoices"
          pageStyle="print"
          onAfterPrint={() => {
            toast.success("Invoices printed!");
          }}
        />
      </div>

      <Card ref={componentRef}>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>List of all invoices in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isSuccess && (invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.userId}</TableCell>
                  <TableCell>{invoice.orderId}</TableCell>
                  <TableCell>
                    {invoice.invoiceDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Link to={`/invoices/${invoice.id}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            handleDelete(invoice.id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
