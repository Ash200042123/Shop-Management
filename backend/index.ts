import { Role } from '@prisma/client'
import bodyParser from 'body-parser';
import express from 'express';
import productRoutes from './routes/product-routes';
import orderRoutes from './routes/order-routes';
import userRoutes from './routes/user-routes';
import invoiceRoutes from './routes/invoice-routes';

const app=express();
const PORT=3000;

app.use(bodyParser.json());
app.use('/api',userRoutes);
app.use('/api', productRoutes);
app.use('/api',orderRoutes);
app.use('/api',invoiceRoutes);




app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})