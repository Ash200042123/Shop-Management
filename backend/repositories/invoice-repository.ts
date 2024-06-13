import { prisma } from "../db";

export const createInvoice = async(orderId:number, userId:number,amount:number)=>{

    return await prisma.invoice.create({
        data: {
            orderId,
            userId,
            totalAmount:amount,
        },
    });
}