

import { Request, Response } from 'express';
import { createOrderService, deleteOrderByUserService, deleteOrderService, getAllOrdersByUserId, getAllOrdersService, getOrderByOrderId, updateOrderStatusService } from '../services/order-service';
import { Status } from '@prisma/client';
import { deleteInvoiceByUserService } from '../services/invoice-service';

export const createOrderController = async (req: Request, res: Response) => {
    const { userId,customerName, products } = req.body;

    try {
        const userIdInt = parseInt(userId, 10);
        if (!userIdInt || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid order data!' });
        }

        const { order, invoice } = await createOrderService(userIdInt,customerName, products);
        return res.status(200).json({ message: 'Order created successfully!', order, invoice });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const getAllOrdersByUserIdController = async (req:Request, res:Response) => {
    const userId = parseInt(req.params.userId);

    try{

        if(!userId){
            return res.status(400).json({error: 'User ID is required to get all orders'});
        }

        const {orders} = await getAllOrdersByUserId(userId);
        return res.status(200).json({message:'Orders are',orders});
    }catch(error){
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getOrderByOrderIdController = async (req:Request, res:Response) => {
    const orderId = parseInt(req.params.orderId);

    try{

        if(!orderId){
            return res.status(400).json({error: 'Order ID is required to get all orders'});
        }

        const {order} = await getOrderByOrderId(orderId);
        return res.status(200).json({order});
    }catch(error){
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getAllOrdersController = async (req:Request, res:Response)=>{

    try {
        const orders = await getAllOrdersService();
        return res.status(200).json({message:'All orders are listed here',orders});
    } catch (error) {
        console.error('Error occured',error);
        return res.status(500).json({error:'Internal Server Error'});
    }
};


export const updateOrderStatusController = async(req:Request, res:Response)=>{

    const {orderId, status}=req.body;

    try {
        const orderIntId = parseInt(orderId);
        if(!orderIntId || !status){
            return res.status(400).json({message:"Order ID and Status is required"});
        }

        if (!Object.values(Status).includes(status)) {
            return res.status(400).json({ error: 'Invalid status value!' });
        }

        const order = await updateOrderStatusService(orderIntId,status);
        return res.status(200).json({order});
    } catch (error) {
        console.error('Error occured',error);
        return res.status(500).json({error:'Internal server Error'});
    }
};


export const deleteOrderController = async(req:Request, res:Response)=>{

    const {orderId}=req.body;

    try{
        if(!orderId){
            return res.status(400).json({message:"Order ID is required"});
        }
        
        const order = await deleteOrderService(orderId);
        return res.status(200).json({order});
    }catch(error){
        console.error('Error occured',error);
        return res.status(500).json({error:'Internal server Error'});
    }
};


export const deleteOrderByUserController = async(req:Request, res:Response)=>{

    const {userId}=req.body;

    try{
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        await deleteInvoiceByUserService(userId);
        const order = await deleteOrderByUserService(userId);
        return res.status(200).json({order});
    }catch(error){
        console.error('Error occured',error);
        return res.status(500).json({error:'Internal server Error'});
    }
};