import { Role } from "@prisma/client";
import { createUser, findUser } from "../repositories/user-repository";


export const signup = async (email:string, password:string, role:Role, name?: string)=>{

    const isOldUser = await findUser(email);

    if(isOldUser){
        throw new Error('User already exists!');
    }

    const newUser = await createUser(email,password,role,name);
    return newUser;
}