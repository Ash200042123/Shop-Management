import { Sales } from "@prisma/client";
import { prisma } from "../db";
import { subWeeks, subMonths } from 'date-fns';



export const findSalesForPastWeek = async () => {
  const oneWeekAgo = subWeeks(new Date(), 1);

  return prisma.sales.findMany({
    where: {
      saleDate: {
        gte: oneWeekAgo,
      },
    },
    select: {
      quantity: true,
      product: {
        select: {
          price: true,
        },
      },
    },
  });
};

export const findSalesForPastMonth = async () => {
  const oneMonthAgo = subMonths(new Date(), 1);

  return prisma.sales.findMany({
    where: {
      saleDate: {
        gte: oneMonthAgo,
      },
    },
    select: {
      quantity: true,
      product: {
        select: {
          price: true,
        },
      },
    },
  });
};



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
  return await prisma.sales.findMany({
    include: {
      product: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });
};


export const getSalesByUserId = async (userId: number) => {
    return await prisma.sales.findMany({
        where: { userId }
    });
};

interface ProductSalesInfo {
    productName: string | null;
    totalUnitsSold: number;
    totalPrice: number;
  }

  interface ProductSalesInfo {
    productName: string | null;
    totalUnitsSold: number;
    totalPrice: number;
  }
  
  export const getSalesProductWise = async (): Promise<ProductSalesInfo[]> => {
    try {
      // Step 1: Fetch the aggregated sales data
      const aggregatedSales = await prisma.sales.groupBy({
        by: ['productId'],
        _sum: {
          quantity: true,
        },
        orderBy: {
          productId: 'asc', // Add appropriate orderBy if needed
        },
      });
  
      // Step 2: Fetch the related product information
      const productIds = aggregatedSales.map((sale) => sale.productId);
      const products = await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      });
  
      // Step 3: Combine the results
      const salesProductWise: ProductSalesInfo[] = aggregatedSales.map((sale) => {
        const product = products.find((p) => p.id === sale.productId);
        const totalUnitsSold = sale._sum.quantity || 0; 
        const totalPrice = totalUnitsSold * (product?.price || 0);
        return {
          productName: product?.name ?? null,
          totalUnitsSold,
          totalPrice,
        };
      });
  
      return salesProductWise;
    } catch (error) {
      console.error('Error fetching sales product-wise:', error);
      throw error; 
    }
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