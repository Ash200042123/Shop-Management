import {z} from "zod";

export const addProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, {message: "Name is required"}),
        description: z.string().min(1, {message: "Description is required"}), 
        price: z.number().positive({ message: "Price must be a positive number" }),
    stock: z.number().int().positive({ message: "Stock must be a positive integer" }),
    })
});


export const getProductByNameSchema = z.object({
    params: z.object({
      name: z.string().min(1),
    }),
  });

  export const updateProductSchema = z.object({
    params: z.object({
      name: z.string().min(1),
    }),
    body: z.object({
        updatedName: z.string().min(1, { message: "Updated name is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        price: z.number().positive({ message: "Price must be a positive number" }),
        stock: z.number().int().positive({ message: "Stock must be a positive integer" }),
      }),
  });


  export const deleteProductSchema = z.object({
    params: z.object({
      name: z.string().min(1),
    }),
  });

export type AddProduct = z.infer<typeof addProductSchema>['body'];
export type GetProductByName = z.infer<typeof getProductByNameSchema>['params'];
export type UpdateProductParams = z.infer<typeof updateProductSchema>['params'];
export type UpdateProductBody = z.infer<typeof updateProductSchema>['body'];
export type DeleteProduct = z.infer<typeof deleteProductSchema>['params'];