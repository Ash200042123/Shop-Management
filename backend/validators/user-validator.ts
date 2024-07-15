import {z} from "zod";

export const signupSchema = z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(['Admin', 'Employee']),
      name: z.string().optional(),
    }),
  });

  export const loginSchema = z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
  });


  export const getUserSchema = z.object({
    params: z.object({
      userId: z.string().min(1),
    }),
  });


  export const updateUnitSoldsByUserSchema = z.object({
    body: z.object({
      userId: z.string().min(1),
      newUnitsSold: z.number().int().positive(),
    }),
  });


  export const updateEmailSchema = z.object({
    params: z.object({
      userId: z.string().min(1),
    }),
    body: z.object({
      email: z.string().email(),
    }),
  });


  export const updatePasswordSchema = z.object({
    body: z.object({
      userId: z.string().min(1).transform(Number),
      newPassword: z.string().min(6),
    }),
  });


  export const deleteUserSchema = z.object({
    params: z.object({
      id: z.string().min(1),
    }),
  });


export type SignupBody = z.infer<typeof signupSchema>['body'];
export type LoginBody = z.infer<typeof loginSchema>['body'];
export type GetUserParams = z.infer<typeof getUserSchema>['params'];
export type UpdateUnitSoldsByUserBody = z.infer<typeof updateUnitSoldsByUserSchema>['body'];
export type UpdateEmailParams = z.infer<typeof updateEmailSchema>['params'];
export type UpdateEmailBody = z.infer<typeof updateEmailSchema>['body'];
export type UpdatePasswordBody = z.infer<typeof updatePasswordSchema>['body'];
export type DeleteUserParams = z.infer<typeof deleteUserSchema>['params'];
