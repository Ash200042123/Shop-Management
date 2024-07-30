import {
  Copy,
  Truck,
  MoreVertical,
  CreditCard,
  LoaderCircle
} from "lucide-react";

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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { useGetOrderQuery, useUpdateOrderMutation } from "@/api/order-slice";
import { toast } from "sonner";

export function OrderDetailsPage() {
  // const [order, setOrder] = useState<Order>();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { orderId } = useParams();

  const [loader, setLoader] = useState(true);
  const {
    data:order,
    isLoading,
    isSuccess,
} = useGetOrderQuery(orderId);
const [updateOrder, { isLoading: isUpdating, error: updateError }] = useUpdateOrderMutation();


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if(isSuccess){
          setLoader(false);
        setSelectedStatus(order.order.status);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrder();
  }, [orderId,isSuccess]);

  if (loader) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    try {
      await updateOrder({orderId:parseInt(orderId??'',10),
        status: selectedStatus}).unwrap();
        toast.success("Order Status Updated Successfully!")
    } catch (error) {
      toast.error("Could not update order status!")
      console.error("Error updating order:", error);
    }
  };

  return ( isSuccess && !isLoading && order && (
    <Card className="w-full max-w-3xl overflow-hidden items-center justify-center">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order {order.order.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: {order.order.orderDate}</CardDescription>
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
            {order.order.products?.map((product:Product) => (
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
              <span>৳{order.order.orderTotal}</span>
            </li>
          </ul>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{order.order.customerName}</dd>
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
                <a href="mailto:liam@acme.com">{order.order.employeeName}</a>
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
              <Button type="submit" className="w-[70%]" onClick={handleSubmit} disabled={isUpdating}>
              {isUpdating && <LoaderCircle className="animate-spin" />}
              {!isUpdating && <div>Update</div>}
              </Button>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  )
  );
}
