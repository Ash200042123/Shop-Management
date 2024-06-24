import { Request, Response } from "express";
import { createSaleService, getAllSalesService, getSalesByProduct, getSalesByUser, removeSale, updateSale } from "../services/sale-service";

export const createSaleController = async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;

    try {
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: 'User ID, Product ID, and quantity are required!' });
        }

        const newSale = await createSaleService(userId, productId, quantity);
        return res.status(201).json({ message: 'Sale record created successfully!', sale: newSale });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getAllSalesController = async (req: Request, res: Response) => {
    try {
        const sales = await getAllSalesService();
        return res.status(200).json(sales);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getSalesByUserController = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required!' });
        }

        const sales = await getSalesByUser(Number(userId));
        return res.status(200).json(sales);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getSalesByProductController = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required!' });
        }

        const sales = await getSalesByProduct(Number(productId));
        return res.status(200).json(sales);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateSaleController = async (req: Request, res: Response) => {
    const { saleId } = req.params;
    const data = req.body;

    try {
        if (!saleId) {
            return res.status(400).json({ error: 'Sale ID is required!' });
        }

        const updatedSale = await updateSale(Number(saleId), data);
        return res.status(200).json({ message: 'Sale record updated successfully!', sale: updatedSale });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const deleteSaleController = async (req: Request, res: Response) => {
    const { saleId } = req.params;

    try {
        if (!saleId) {
            return res.status(400).json({ error: 'Sale ID is required!' });
        }

        const deletedSale = await removeSale(Number(saleId));
        return res.status(200).json({ message: 'Sale record deleted successfully!', sale: deletedSale });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};