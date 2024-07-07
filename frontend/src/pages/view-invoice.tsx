import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useParams } from "react-router-dom";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "@/utils/cookie-utils";
import ReactToPrint from "react-to-print";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { toast } from "sonner";

interface Product {
  productId: number;
  quantity: number;
}

interface Invoice {
  id: number;
  userId: number;
  customerName: string;
  employeeName: string;
  products: Product[]; 
  invoiceDate: string;
  totalAmount: number;
}

export function ViewInvoice() {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const token = getCookie(); 
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }

        const response = await axios.get<Invoice>(
          `${backendUrl}/invoices/${invoiceId}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setInvoice(response.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (!invoice) {
    return null; // Handle loading state or error here
  }

  // Parse products JSON string to array
  const products = JSON.parse(invoice.products);

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
    <div className="sm:py-8 sm:px-8" ref={componentRef}>
      <Card className="w-full p-6 shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">View Invoice</CardTitle>
          <CardDescription>
            View detailed information about the invoice.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              Invoice ID
            </label>
            <span className="text-lg font-semibold">{invoice.id}</span>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <span className="text-lg font-semibold">
              {invoice.customerName}
            </span>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              Employee Name
            </label>
            <span className="text-lg font-semibold">
              {invoice.employeeName}
            </span>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              Products
            </label>
            <ul className="list-disc list-inside">
              {products.map((product: Product) => (
                <li
                  key={product.productId}
                >{`Product ID: ${product.productId}, Quantity: ${product.quantity}`}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              Invoice Date
            </label>
            <span className="text-lg font-semibold">
              {new Date(invoice.invoiceDate).toLocaleDateString()}
            </span>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              Total Amount
            </label>
            <span className="text-lg font-semibold">{invoice.totalAmount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
