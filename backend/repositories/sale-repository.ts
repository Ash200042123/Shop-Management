import { prisma } from "../db";

export const createSale = async (userId: number, productId: number, quantity: number) => {
    return await prisma.sales.create({
        data: {
            userId,
            productId,
            quantity,
        }
    });
};


export const getAllSales = async () => {
    return await prisma.sales.findMany();
};


export const getSalesByUserId = async (userId: number) => {
    return await prisma.sales.findMany({
        where: { userId }
    });
};


export const getSalesByProductId = async (productId: number) => {
    return await prisma.sales.findMany({
        where: { productId }
    });
};


export const updateSaleById = async (saleId: number, data: any) => {
    return await prisma.sales.update({
        where: { id: saleId },
        data
    });
};


export const deleteSaleById = async (saleId: number) => {
    return await prisma.sales.delete({
        where: { id: saleId }
    });
};