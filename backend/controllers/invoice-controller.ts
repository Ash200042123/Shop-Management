import { Request, Response } from 'express';
import { deleteInvoiceByOrderService, deleteInvoiceByUserService, getAllInvoicesService, getInvoiceByOrderService, getInvoiceByUserService } from '../services/invoice-service';

export const getInvoiceByOrderIdController = async(req:Request, res:Response)=>{

    const  orderId  = parseInt(req.params.orderId);

    try {
        if(!orderId){
           return res.status(400).json({message:"Please provide an order ID"});
        }

        const invoice = await getInvoiceByOrderService(orderId);
        return res.status(200).json({invoice});
    } catch (error) {
        console.error("Error occured",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};


export const getInvoiceByUserIdController = async(req:Request, res:Response)=>{

    const  userId  = parseInt(req.params.userId);

    try {
        if(!userId){
            return res.status(400).json({message:"Please provide an user ID"});
        }

        const invoices = await getInvoiceByUserService(userId);
        return res.status(200).json({invoices});
    } catch (error) {
        console.error("Error occured",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};


export const getAllInvoicesController = async(req:Request, res:Response)=>{

    try {
        const invoices = await getAllInvoicesService();
        return res.status(200).json({invoices});
    } catch (error) {
        console.error("Error occured",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};



export const deleteInvoiceByUserController = async(req:Request, res:Response)=>{

    const {userId}=req.body;

    try{
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
        const invoice = await deleteInvoiceByUserService(userId);
        return res.status(200).json({invoice});
    }catch(error){
        console.error('Error occured',error);
        return res.status(500).json({error:'Internal server Error'});
    }
};


export const deleteInvoiceByOrderController = async(req:Request, res:Response)=>{

    const {orderId}=req.body;

    try{
        if(!orderId){
            return res.status(400).json({message:"Order ID is required"});
        }
        
        const order = await deleteInvoiceByOrderService(orderId);
        return res.status(200).json({order});
    }catch(error){
        console.error('Error occured',error);
        return res.status(500).json({error:'Internal server Error'});
    }
};