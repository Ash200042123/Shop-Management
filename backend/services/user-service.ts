import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { createUser, findAllUsers, findUser, updatePasswordByUserId, updateUserUnitsSold } from "../repositories/user-repository";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const signup = async (email:string, password:string, role:Role, name?: string)=>{

    const isOldUser = await findUser(email);

    if(isOldUser){
        throw new Error('User already exists!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email,hashedPassword,role,name);
    return newUser;
};


export const loginUser = async (email: string, password: string) => {
  const user = await findUser(email);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' } 
  );

  return { token, user };
};


export const getAllUsers = async()=>{
  const users = await findAllUsers();
  return users;
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