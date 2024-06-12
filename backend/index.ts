import { PrismaClient, Role } from '@prisma/client'
import bodyParser from 'body-parser';
import express from 'express';
import { signupController } from './controllers/user-controller';

const prisma = new PrismaClient();
const app=express();
const PORT=3000;

app.use(bodyParser.json());


app.post('/signup',signupController);

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})