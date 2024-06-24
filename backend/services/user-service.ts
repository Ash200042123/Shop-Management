import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { createUser, findUser, updatePasswordByUserId, updateUserUnitsSold } from "../repositories/user-repository";


export const signup = async (email:string, password:string, role:Role, name?: string)=>{

    const isOldUser = await findUser(email);

    if(isOldUser){
        throw new Error('User already exists!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email,hashedPassword,role,name);
    return newUser;
};


export const updatePassword = async (userId: number, newPassword: string) => {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await updatePasswordByUserId(userId, hashedPassword);
    return updatedUser;
  };


export const updateUnitSoldsByUserService = async (email:string, newUnitsSold:number)=>{
    const user = updateUserUnitsSold(email, newUnitsSold);
    return user;
};