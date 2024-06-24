import { deleteInvoiceByOrderId, deleteInvoiceByUser, getAllInvoice, getInvoiceByOrderId, getInvoiceByUser } from "../repositories/invoice-repository"



export const getInvoiceByOrderService = async(orderId:number)=>{

    const invoice = await getInvoiceByOrderId(orderId);
    if (!invoice) {
        throw new Error('Invoice not found!');
    }
    return invoice;
};


export const getInvoiceByUserService = async(userId:number)=>{

    const invoices = await getInvoiceByUser(userId);
    if (!invoices) {
        throw new Error('Invoice not found!');
    }
    return invoices;
};


export const getAllInvoicesService = async()=>{

    const invoices = await getAllInvoice();
    return invoices;
};


export const deleteInvoiceByUserService = async(userId:number)=>{
    const order = await deleteInvoiceByUser(userId);
    if(!order){
        throw new Error('Order not found!');
    }
    return order;
};


export const deleteInvoiceByOrderService = async(orderId:number)=>{
    const order = await deleteInvoiceByOrderId(orderId);
    if(!order){
        throw new Error('Order not found!');
    }
    return order;
};