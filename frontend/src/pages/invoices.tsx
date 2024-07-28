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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookie-utils";
import ReactToPrint from "react-to-print";
import { toast } from "sonner";

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const token = getCookie();
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }

        const response = await axios.get(`${backendUrl}/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const fetchedInvoices = response.data.invoices.map((invoice: any) => ({
          id: invoice.id,
          userId: invoice.userId,
          orderId: invoice.orderId,
          invoiceDate: new Date(invoice.invoiceDate),
          totalAmount: invoice.totalAmount,
        }));
        setInvoices(fetchedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }

      await axios.delete(`${backendUrl}/invoices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setInvoices(invoices.filter((invoice) => invoice.id !== id));
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
              {invoices.map((invoice) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
