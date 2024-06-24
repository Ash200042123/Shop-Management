import { prisma } from "../db";

export const createInvoice = async(orderId:number, userId:number,amount:number)=>{

    return await prisma.invoice.create({
        data: {
            orderId,
            userId,
            totalAmount:amount,
        },
    });
};


export const getInvoiceByOrderId = async(orderId:number)=>{

    return await prisma.invoice.findUnique({
        where:{orderId:orderId}
    });
};


export const getInvoiceByUser = async(userId:number)=>{

    return await prisma.invoice.findMany({
        where:{userId:userId}
    });
};

export const getAllInvoice = async()=>{
    return await prisma.invoice.findMany();
};


export const deleteInvoiceByOrderId = async(orderId:number)=>{

    return await prisma.invoice.delete({
        where:{
            orderId:orderId
        }
    });
};


export const deleteInvoiceByUser = async(userId:number)=>{

    return await prisma.invoice.deleteMany({
        where:{
            userId:userId
        }
    });
};