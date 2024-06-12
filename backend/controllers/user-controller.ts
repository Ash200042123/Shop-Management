
import { Request, Response } from 'express';
import { signup } from '../services/user-service';

export const signupController = async (req: Request, res:Response)=>{
    const {email, password, role, name} = req.body;

    try{

        if(!email || !password || !role){
            return res.status(400).json({error: 'Please provide email, password and role!'});
        }

        const newUser = await signup(email,password,role,name);
        return res.status(200).json({message:'Signup Successful!', user: newUser});
    }catch(error){
        console.error('Error occured:',error);
        return res.status(500).json({error:'Internal Server Error'});
    }
}