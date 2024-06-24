import { Status } from "@prisma/client";
import { prisma } from "../db";

export const createOrder = async(userId:number,products:{productId:number; quantity:number}[])=>{

    const productData = products.map(product=>({
        productId:product.productId,
        quantity:product.quantity,
    }));

    return await prisma.order.create({
        data:{
            userId,
            products:JSON.stringify(productData),
        }
    })
};


export const updateOrderWithInvoiceId = async (orderId: number, invoiceId: number) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { invoiceId },
    });
};


export const getOrdersByUserId = async (userId: number) =>{
    return await prisma.order.findMany({
        where:{userId:userId}
    })
};

export const getOrdersByOrderId = async (orderId: number) =>{
    return await prisma.order.findUnique({
        where:{id:orderId}
    })
};


export const getAllOrders = async()=>{
    return await prisma.order.findMany();
};


export const updateOrderStatus = async(orderId: number, status: Status)=>{
    return await prisma.order.update({
        where:{id:orderId},
        data:{status:status},
    });
};


export const deleteOrderById = async(orderId:number)=>{
    return await prisma.order.delete({
        where:{id:orderId}
    });
};


export const deleteOrderByUser = async(userId:number)=>{

    return await prisma.order.deleteMany({
        where:{
            userId:userId
        }
    });
};