import { Role } from "@prisma/client";
import { prisma } from "../db";


export const findUser = async(email:string)=>{
    return await prisma.user.findUnique({where: {email},});
};


export const createUser = async(email:string, password:string, role:Role, name?:string)=>{
    return await prisma.user.create({
        data:{
            email,password,role,name,
        }
    });
};