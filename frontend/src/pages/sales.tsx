import { File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookie-utils";
import ReactToPrint from "react-to-print";
import { toast } from "sonner";

export function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [salesSummary, setSalesSummary] = useState<SalesSummary[]>([]);
  const token = getCookie();
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }

        // Fetch detailed sales data
        const detailedSalesResponse = await axios.get(
          `${backendUrl}/sales/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const detailedSales = detailedSalesResponse.data.map((sale: any) => ({
          id: sale.id,
          userId: sale.userId,
          productId: sale.productId,
          saleDate: new Date(sale.saleDate),
          productName: sale.productName,
          totalPrice: sale.totalPrice,
          quantity: sale.quantity,
        }));

        setSales(detailedSales);

        // Fetch sales summary data
        const summaryResponse = await axios.get(`${backendUrl}/sales`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setSalesSummary(summaryResponse.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  const filteredSales = {
    week: sales.filter((sale) => {
      const saleDate = new Date(sale.saleDate);
      const now = new Date();
      const oneWeekAgo = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      return saleDate >= oneWeekAgo;
    }),
    month: sales.filter((sale) => {
      const saleDate = new Date(sale.saleDate);
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      return saleDate >= oneMonthAgo;
    }),
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Tabs defaultValue="products">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            
          <ReactToPrint
              trigger={() => {
                return <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>;
              }}
              content={()=>componentRef.current}
              documentTitle="All Orders"
              pageStyle="print"
              onAfterPrint={()=>{toast.success("PDF printed")}}
            />
          </div>
        </div>
        <TabsContent value="products">
          <Card ref={componentRef}>
            <CardHeader>
              <CardTitle>Sales by Products</CardTitle>
              <CardDescription>
                Recent sales grouped by products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Total Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesSummary.map((summary: SalesSummary) => (
                    <TableRow key={summary.productName}>
                      <TableCell>{summary.productName}</TableCell>
                      <TableCell>{summary.totalUnitsSold}</TableCell>
                      <TableCell>{summary.totalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Sales This Week</CardTitle>
              <CardDescription>Sales data for the past week.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sale ID</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Sale Amount</TableHead>
                    <TableHead>Sale Date</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.week.map((sale: Sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.id}</TableCell>
                      <TableCell>{sale.userId}</TableCell>
                      <TableCell>{sale.productName}</TableCell>
                      <TableCell>{sale.totalPrice}</TableCell>
                      <TableCell>
                        {sale.saleDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle>Sales This Month</CardTitle>
              <CardDescription>Sales data for the past month.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sale ID</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Sale Amount</TableHead>
                    <TableHead>Sale Date</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.month.map((sale: Sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.id}</TableCell>
                      <TableCell>{sale.userId}</TableCell>
                      <TableCell>{sale.productName}</TableCell>
                      <TableCell>{sale.totalPrice}</TableCell>
                      <TableCell>
                        {sale.saleDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
