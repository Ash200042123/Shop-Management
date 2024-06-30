import { Status } from "@prisma/client";
import { createInvoice } from "../repositories/invoice-repository";
import { createOrder, deleteOrderById, deleteOrderByUser, getAllOrders, getOrdersByOrderId, getOrdersByUserId, updateOrderStatus, updateOrderWithInvoiceId } from "../repositories/order-repository";
import { findProductById } from "../repositories/product-repository";
import { deleteInvoiceByOrderService } from "./invoice-service";
import { getProductById } from "./product-service";
import { findUserById } from "../repositories/user-repository";

const calculateOrderTotal = async(products:{productId:number; quantity:number}[])=>{
    let total=0;

    for(const product of products){
        const productData = await findProductById(product.productId);
        if(productData){
            total+= productData.price*product.quantity;
        }
    }

    return total;
}


export const createOrderService = async(userId:number,customerName:string,products:{productId:number; quantity:number}[])=>{
    const newOrder = await createOrder(userId,customerName,products);

    const totalOrderAmount = await calculateOrderTotal(products);
    const newInvoice = await createInvoice(newOrder.id, userId, totalOrderAmount);

    const order = await updateOrderWithInvoiceId(newOrder.id, newInvoice.id);
    return {order, invoice:newInvoice};
};



export const getAllOrdersByUserId = async(userId:number)=>{
    const orders = await getOrdersByUserId(userId);
    return {orders};
};

export const getOrderByOrderId = async(orderId:number)=>{
    const order = await getOrdersByOrderId(orderId);
    if (!order) {
        throw new Error('Order not found!');
    }

    const products = JSON.parse(order.products as string);

  
  const productsWithDetails = await Promise.all(
    products.map(async (product: any) => {
      const productDetails = await getProductById(product.productId);
      const productName = productDetails ? productDetails.name : 'Product Not Found';
      const productPrice = productDetails ? productDetails.price : 'Product Not Found';
      return {
        ...product,
        productName,
        productPrice,
        quantity: product.quantity, 
      };
    })
  );

  const user = await findUserById(order.userId);
  const employeeName = user?.name;

  const orderTotal = await calculateOrderTotal(productsWithDetails);

  const orderWithProductDetails = {
    ...order,
    products: productsWithDetails,
    orderTotal: orderTotal, 
    employeeName: employeeName
  };

  return { order: orderWithProductDetails };
};


export const getAllOrdersService = async()=>{
    const orders = await getAllOrders();
    return {orders};
};


export const updateOrderStatusService = async(orderId:number,status:Status)=>{
    const order = await updateOrderStatus(orderId,status);
    if (!order) {
        throw new Error('Order not found!');
    }
    return order;
};


export const deleteOrderByUserService = async(userId:number)=>{
    const order = await deleteOrderByUser(userId);
    if(!order){
        throw new Error('Order not found!');
    }
    return order;
}


export const deleteOrderService = async(orderId:number)=>{
    await deleteInvoiceByOrderService(orderId);
    const order = await deleteOrderById(orderId);
    if(!order){
        throw new Error('Order not found!');
    }
    return order;
};