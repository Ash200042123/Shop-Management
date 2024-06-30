import { Role } from "@prisma/client";
import { prisma } from "../db";


export const findUser = async(email:string)=>{
    return await prisma.user.findUnique({where: {email},});
};

export const findUserById = async(userId:number)=>{
  return await prisma.user.findUnique({where: {id:userId},});
};


export const createUser = async(email:string, password:string, role:Role, name?:string)=>{
    return await prisma.user.create({
        data:{
            email,password,role,name,
        }
    });
};


export const updatePasswordByUserId = async (userId: number, hashedPassword: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
  };


export const updateUserUnitsSold = async(email:string, newUnitsSold:number)=>{
    const user = await prisma.user.findUnique({where: {email},});
    if(!user){
        throw new Error('User not found');
    }
    return await prisma.user.update({
        where:{email:email},
        data:{
            unitsSold: user.unitsSold+newUnitsSold
        }
    })
}