import { createSale, deleteSaleById, getAllSales, getSalesByProductId, getSalesByUserId, getSalesProductWise, updateSaleById } from "../repositories/sale-repository";


export const createSaleService = async (userId: number, productId: number, quantity: number) => {
    if (!userId || !productId || !quantity) {
        throw new Error('User ID, Product ID, and quantity are required!');
    }

    const newSale = await createSale(userId, productId, quantity);
    return newSale;
};


export const getAllSalesService = async () => {
    const sales = await getAllSales();
    return sales.map(sale => ({
        id: sale.id,
        userId: sale.userId,
        productId: sale.productId,
        productName: sale.product.name,
        totalPrice: sale.product.price * sale.quantity,
        saleDate: sale.saleDate,
        quantity: sale.quantity,
      }));
    
};

export const getAllSalesByProduct = async () => {
    const sales = await getSalesProductWise();
    return sales;
};


export const getSalesByUser = async (userId: number) => {
    if (!userId) {
        throw new Error('User ID is required!');
    }

    const sales = await getSalesByUserId(userId);
    return sales;
};


export const getSalesByProduct = async (productId: number) => {
    if (!productId) {
        throw new Error('Product ID is required!');
    }

    const sales = await getSalesByProductId(productId);
    return sales;
};

export const updateSale = async (saleId: number, data: any) => {
    if (!saleId) {
        throw new Error('Sale ID is required!');
    }

    const updatedSale = await updateSaleById(saleId, data);
    return updatedSale;
};



export const removeSale = async (saleId: number) => {
    if (!saleId) {
        throw new Error('Sale ID is required!');
    }

    const deletedSale = await deleteSaleById(saleId);
    return deletedSale;
};