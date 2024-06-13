import { createInvoice } from "../repositories/invoice-repository";
import { createOrder, updateOrderWithInvoiceId } from "../repositories/order-repository";
import { findProductById } from "../repositories/product-repository";


export const createOrderService = async(userId:number,products:{productId:number; quantity:number}[])=>{
    const newOrder = await createOrder(userId,products);

    const totalOrderAmount = await calculateOrderTotal(products);
    const newInvoice = await createInvoice(newOrder.id, userId, totalOrderAmount);

    const order = await updateOrderWithInvoiceId(newOrder.id, newInvoice.id);
    return {order, invoice:newInvoice};
}

const calculateOrderTotal = async(products:{productId:number; quantity:number}[])=>{
    let total=0;

    for(const product of products){
        const productData = await findProductById(product.productId);
        if(productData){
            total+= productData.price*product.quantity;
        }
    }

    return total;
}