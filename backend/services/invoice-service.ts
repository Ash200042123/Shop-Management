import { deleteInvoiceByInvoiceId, deleteInvoiceByOrderId, deleteInvoiceByUser, getAllInvoice, getInvoiceById, getInvoiceByOrderId, getInvoiceByUser } from "../repositories/invoice-repository"


export async function getInvoiceByInvoiceId(id: number) {
    const invoice = await getInvoiceById(id);
    if (!invoice) {
        throw new Error('Invoice not found!');
    }
    return invoice;
  }


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


export const deleteInvoiceByIdService = async(invoiceId:number)=>{
    const invoice = await deleteInvoiceByInvoiceId(invoiceId);
    if(!invoice){
        throw new Error('Invoice not found!');
    }
    return invoice;
};