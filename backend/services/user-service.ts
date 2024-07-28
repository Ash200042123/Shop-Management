import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { createUser, deleteUserById, findAllUsers, findUser, findUserById, updateEmailByUserId, updatePasswordByUserId, updateUserUnitsSold } from "../repositories/user-repository";
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
    { expiresIn: '1d' } 
  );

  return { token, user };
};


export const getAllUsers = async()=>{
  const users = await findAllUsers();
  return users;
};


export const getUser = async(userId:number)=>{
  if(!userId){
      throw new Error('User ID is required!');
  }
  const user=await findUserById(userId);

  if(!user){
      const error: any = new Error('User not found!');
      error.code = 'USER_NOT_FOUND';
      throw error;
  }

  return user;
}


export const updatePassword = async (userId: number, newPassword: string) => {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await updatePasswordByUserId(userId, hashedPassword);
    return updatedUser;
  };


  export const updateEmail = async (userId: number, email: string) => {
    if (!email || email.length < 6) {
      throw new Error('Email must be at least 6 characters long');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  
    const updatedUser = await updateEmailByUserId(userId, email);
    return updatedUser;
  };


export const updateUnitSoldsByUserService = async (userId:number, newUnitsSold:number)=>{
    const user = updateUserUnitsSold(userId, newUnitsSold);
    return user;
};




export const deleteUser= async(id:number)=>{
  if(!id){
      throw new Error('Provide User ID to delete!');
  }

  const isExistingUser = await findUserById(id);

  if(!isExistingUser){
      const error: any = new Error('User not found!');
      error.code = 'USER_NOT_FOUND';
      throw error;
  }

  const user= await deleteUserById(isExistingUser.id);
  return user;
}