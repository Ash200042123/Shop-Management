import { Role } from '@prisma/client'
import bodyParser from 'body-parser';
import express from 'express';
import productRoutes from './routes/product-routes';
import orderRoutes from './routes/order-routes';
import userRoutes from './routes/user-routes';
import invoiceRoutes from './routes/invoice-routes';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
const cors=require('cors')
const PORT=3000;
const corsOptions = {
  origin: ['http://localhost:5173'], 
  methods: 'GET,POST', 
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/api',userRoutes);
app.use('/api', productRoutes);
app.use('/api',orderRoutes);
app.use('/api',invoiceRoutes);




app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})