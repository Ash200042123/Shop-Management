import {number, z} from "zod";

export const getInvoiceByIdSchema = z.object({
    params: z.object({
      id: z.string().min(1, {message:"Provide Invoice ID"}),
    }),
  });

  export const getInvoiceByOrderIdSchema = z.object({
    params: z.object({
        orderId: z.string().min(1, {message:"Provide Order ID"}),
    }),
  });

  export const getInvoiceByUserIdSchema = z.object({
    params: z.object({
        userId: z.string().min(1, {message:"Provide User ID"}),
    }),
  });

  export const deleteInvoiceSchema = z.object({
    params: z.object({
      invoiceId: z.string().min(1),
    }),
  });


export type GetInvoiceByInvoiceId = z.infer<typeof getInvoiceByIdSchema>['params'];
export type GetInvoiceByOrderId = z.infer<typeof getInvoiceByOrderIdSchema>['params'];
export type GetInvoiceByUserId = z.infer<typeof getInvoiceByUserIdSchema>['params'];
export type DeleteInvoice = z.infer<typeof deleteInvoiceSchema>['params'];