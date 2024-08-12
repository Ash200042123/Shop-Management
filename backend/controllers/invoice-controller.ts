import { Request, Response } from 'express';
import { deleteInvoiceByOrderService, deleteInvoiceByUserService, getAllInvoicesService, getInvoiceByInvoiceId, getInvoiceByOrderService, getInvoiceByUserService } from '../services/invoice-service';
import { DeleteInvoice, GetInvoiceByInvoiceId, GetInvoiceByOrderId, GetInvoiceByUserId } from '../validators/invoice-validator';


export async function getInvoiceByIdController(req: Request<GetInvoiceByInvoiceId>, res: Response) {
    const { id } = req.params;
  
    try {
      const invoiceId = parseInt(id, 10);
      const invoice = await getInvoiceByInvoiceId(invoiceId);
      
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
  
      res.status(200).json({
        id: invoice.id,
        userId: invoice.userId,
        customerName: invoice.order.customerName,
        employeeName: invoice.order.user.name,
        products: invoice.order.products,
        invoiceDate: invoice.invoiceDate,
        totalAmount: invoice.totalAmount,
      });
    } catch (error) {
      console.error('Error fetching invoice:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


export const getInvoiceByOrderIdController = async(req:Request<GetInvoiceByOrderId>, res:Response)=>{

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


export const getInvoiceByUserIdController = async(req:Request<GetInvoiceByUserId>, res:Response)=>{

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


export const deleteInvoiceByIdController = async(req:Request<DeleteInvoice>, res:Response)=>{

    const invoiceId=req.params.invoiceId;

    try{
        const invoiceIdInt = parseInt(invoiceId);
        if(!invoiceIdInt){
            return res.status(400).json({message:"Invoice ID is required"});
        }

        const invoice = await deleteInvoiceByOrderService(invoiceIdInt);
        return res.status(200).json({invoice});
    }catch(error){
        console.error('Error occured',error);
        return res.status(500).json({error:'Internal server Error'});
    }
};