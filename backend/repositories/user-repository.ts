import { Role } from "@prisma/client";
import { prisma } from "../db";


export const findUser = async(email:string)=>{
    return await prisma.user.findUnique({where: {email},});
};

export const findUserById = async(userId:number)=>{
  return await prisma.user.findUnique({where: {id:userId},select:{id: true,
    email: true,
    name: true,
    role: true,
    unitsSold: true,}});
};


export const findAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      unitsSold: true,
    },
  });
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

export const updateEmailByUserId = async (userId: number, email: string) => {
  
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return await prisma.user.update({
      where: { id: userId },
      data: {
         email,
      },
    });
  };


export const updateUserUnitsSold = async(userId:number, newUnitsSold:number)=>{
    const user = await prisma.user.findUnique({where: {id:userId},});
    if(!user){
        throw new Error('User not found');
    }
    return await prisma.user.update({
        where:{id:userId},
        data:{
            unitsSold: user.unitsSold+newUnitsSold
        }
    })
};



export const deleteUserById = async(id:number)=>{
  return await prisma.user.delete({
      where:{id}
  });
}