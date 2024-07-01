
import { Request, Response } from 'express';
import { getAllUsers, loginUser, signup, updatePassword, updateUnitSoldsByUserService } from '../services/user-service';

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
};

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      const { token, user } = await loginUser(email, password);
      return res.status(200).json({ token, user });
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(401).json({ error: "Internal Server Error" });
    }
  };

export const updatePasswordController = async (req: Request, res: Response) => {
    const { userId, newPassword } = req.body;
  
    try {
      if (!userId || !newPassword) {
        return res.status(400).json({ error: 'User ID and new password are required' });
      }
  
      const updatedUser = await updatePassword(userId, newPassword);
      return res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const getAllUsersController = async(req:Request,res:Response)=>{
    try{
        const users = await getAllUsers();
        return res.status(200).json({users:users});
    }catch(error){
        console.error('Error occured:',error);
        return res.status(500).json({error:'Internal Server Error'});
    }
}


export const updateUnitSoldsByUserController = async(req:Request, res:Response)=>{
    const {email, newUnitsSold} = req.body;

    try {
        if(!email || !newUnitsSold ){
            return res.status(400).json({error: 'Please provide email and units!'});
        }

        const user = await updateUnitSoldsByUserService(email,newUnitsSold);
        return res.status(200).json({user});
    } catch (error) {
        console.error('Error occured:',error);
        return res.status(500).json({error:'Internal Server Error'});
    }
};


