import { z } from "zod";

export const postSaleSchema = z.object({
  body: z.object({
    userId: z.number().int().positive(),
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
  }),
});


export const getSalesByUserSchema = z.object({
    params: z.object({
      userId: z.string().min(1),
    }),
  });


export const getSalesByProductSchema = z.object({
    params: z.object({
      productId: z.string().min(1),
    }),
  });


  export const updateSaleSchema = z.object({
    params: z.object({
      salesId: z.string().min(1),
    }),
    body: z.object({
      userId: z.number().int().positive().optional(),
      productId: z.number().int().positive().optional(),
      quantity: z.number().int().positive().optional(),
    }),
  });


  export const deleteSaleSchema = z.object({
    params: z.object({
      saleId: z.string().min(1).transform(Number),
    }),
  });



export type CreateSale = z.infer<typeof postSaleSchema>['body'];
export type GetSalesByUserParams = z.infer<typeof getSalesByUserSchema>['params'];
export type GetSalesByProductParams = z.infer<typeof getSalesByProductSchema>['params'];
export type UpdateSaleParams = z.infer<typeof updateSaleSchema>['params'];
export type UpdateSaleBody = z.infer<typeof updateSaleSchema>['body'];
export type DeleteSaleParams = z.infer<typeof deleteSaleSchema>['params'];

