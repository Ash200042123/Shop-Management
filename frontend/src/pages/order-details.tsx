import {
  Copy,
  Truck,
  MoreVertical,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  LoaderCircle
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";


import {  useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookie-utils";

export function OrderDetailsPage() {
  const [order, setOrder] = useState<Order>();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { orderId } = useParams();
  const token= getCookie();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }
        const response = await axios.get(`${backendUrl}/orders/${orderId}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setOrder(response.data.order);
        setSelectedStatus(response.data.order.status);
        console.log(response.data.order);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }

      const response = await axios.put(`${backendUrl}/orders`, {
        orderId,
        status: selectedStatus,
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
    } catch (error) {
      console.error("Error updating order:", error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl overflow-hidden items-center justify-center">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order {order.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: {order.orderDate}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            {order.products.map((product) => (
              <li
                key={product.productId}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">
                  {product.productName} x <span>{product.quantity}</span>
                </span>
                <span>৳{product.productPrice}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>৳{order.orderTotal}</span>
            </li>
          </ul>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{order.customerName}</dd>
            </div>
            {/* <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:liam@acme.com">liam@acme.com</a>
                      </dd>
                    </div> */}
          </dl>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Employee Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Employee ID</dt>
              <dd>{order.userId}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Employee name</dt>
              <dd>
                <a href="mailto:liam@acme.com">{order.employeeName}</a>
              </dd>
            </div>
          </dl>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Order Status</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Current status
              </dt>
              <dd>
                <Select
                  name="status"
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </dd>
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit" className="w-[70%]" onClick={handleSubmit} disabled={loading}>
              {loading && <LoaderCircle className="animate-spin" />}
              {!loading && <div>Update</div>}
              </Button>
            </div>
          </dl>
        </div>
      </CardContent>
      {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter> */}
    </Card>
  );
}
