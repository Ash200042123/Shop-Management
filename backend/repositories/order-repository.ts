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
}


export const updateOrderWithInvoiceId = async (orderId: number, invoiceId: number) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { invoiceId },
    });
};