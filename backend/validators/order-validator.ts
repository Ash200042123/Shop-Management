import { Status } from "@prisma/client";
import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
      userId: z.number().int(),
      customerName: z.string().min(1),
      products: z.array(
        z.object({
          productId: z.number().int(),
          quantity: z.number().min(1),
        })
      ),
    }),
  });


export const getOrdersByUserIdSchema = z.object({
  params: z.object({
    userId: z.string().min(1),
  }),
});


export const getOrderByOrderIdSchema = z.object({
  params: z.object({
    orderId: z.string().min(1),
  }),
});


export const updateOrderStatusSchema = z.object({
  body: z.object({
    orderId: z.number().int(),
    status: z.string().min(1).refine((value) => Object.values(Status).includes(value as Status), {
        message: 'Invalid status value!',
      }),
  }),
});


export const deleteOrderSchema = z.object({
  body: z.object({
    orderId: z.number().int(),
  }),
});


export type CreateOrder = z.infer<typeof createOrderSchema>['body'];
export type GetOrdersByUserId = z.infer<typeof getOrdersByUserIdSchema>['params'];
export type GetOrderByOrderId = z.infer<typeof getOrderByOrderIdSchema>['params'];
export type UpdateOrderSatus = z.infer<typeof updateOrderStatusSchema>['body'];
export type DeleteOrder = z.infer<typeof deleteOrderSchema>['body'];