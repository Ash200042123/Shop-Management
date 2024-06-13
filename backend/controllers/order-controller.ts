

import { Request, Response } from 'express';
import { createOrderService } from '../services/order-service';

export const createOrderController = async (req: Request, res: Response) => {
    const { userId, products } = req.body;

    try {
        if (!userId || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid order data!' });
        }

        const { order, invoice } = await createOrderService(userId, products);
        return res.status(200).json({ message: 'Order created successfully!', order, invoice });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
