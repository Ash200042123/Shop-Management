import { Role } from "@prisma/client";
import { prisma } from "../db";



export const findProduct = async(name:string)=>{
    return await prisma.product.findFirst({where: {name:{equals:name,mode:'insensitive'}},});
};

export const findProductById = async(productId:number)=>{
    return await prisma.product.findUnique({where:{id:productId},});
}


export const createProduct = async(name:string, description:string, price:number, stock:number)=>{
    // const lowercaseName = name.toLowerCase();
    return await prisma.product.create({
        data:{
            name, description, price, stock
        }
    })
}


export const findAllProducts = async()=>{
    return await prisma.product.findMany();
}



export const updateProductByName = async(name:string,updatedName?:string, updatedDescription?:string, updatedPrice?:number, updatedStock?:number)=>{
    
    const data: { [key: string]: any } = {};

    if(updatedName) data.name=updatedName;
    if(updatedDescription) data.description=updatedDescription;
    if(updatedPrice) data.price=updatedPrice;
    if(updatedStock) data.stock=updatedStock;

    return await prisma.product.update({
        where:{name},
        data:data
    });
}


export const deleteProductByName = async(name:string)=>{
    return await prisma.product.delete({
        where:{name}
    });
}