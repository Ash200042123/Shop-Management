import {
  File,
  ListFilter,
  
} from "lucide-react";



import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {  Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookie-utils";

export function Homepage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  const token = getCookie();
  if(!token){
    <Navigate to="/login" replace />
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }

        const response = await axios.get(`${backendUrl}/orders`); 
        const fetchedOrders = response.data.orders.orders.map((order: any) => ({
          id: order.id,
          customerName: order.customerName,
          userId: order.userId,
          orderDate: new Date(order.orderDate).toLocaleString(),
          status: order.status,
          products: order.products, 
          invoiceId: order.invoiceId,
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  const handleClick = (order:Order)=>{
    navigate(`/orders/${order.id}`);
  };

  const handleOrderClick = ()=>{
    navigate('/orders/create')
  }
   
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>Your Orders</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Introducing Our Dynamic Orders Dashboard for Seamless
                      Management and Insightful Analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={handleOrderClick}>Create New Order</Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>This Week</CardDescription>
                    <CardTitle className="text-4xl">$1,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +25% from last week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-4xl">$5,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +10% from last month
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={12} aria-label="12% increase" />
                  </CardFooter>
                </Card>
              </div>
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Fulfilled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Refunded
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>
                        Recent orders from your store.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer Name</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Employee
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Date
                            </TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id} onClick={()=>handleClick(order)} className="cursor-pointer">
                              <TableCell className="font-medium">
                                {order.customerName}
                              </TableCell>
                              <TableCell className="font-medium">
                                {order.userId}
                              </TableCell>
                              <TableCell>{order.status}</TableCell>
                              <TableCell className="hidden md:table-cell">
                              {order.orderDate}
                            </TableCell>
                              <TableCell className="text-right">
                                500
                              </TableCell>
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
