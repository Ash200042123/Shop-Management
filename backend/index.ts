import { Role } from '@prisma/client'
import bodyParser from 'body-parser';
import express from 'express';
import { signupController } from './controllers/user-controller';
import { addProductController, deleteProductController, getAllProductsController, getProductController, updateProductController } from './controllers/product-controller';
import { createOrderController } from './controllers/order-controller';

const app=express();
const PORT=3000;

app.use(bodyParser.json());


app.post('/signup',signupController);
app.post('/add-product',addProductController);
app.get('/products',getAllProductsController);
app.get('/products/:name',getProductController);
app.put('/products/:name',updateProductController);
app.delete('/products', deleteProductController);
app.post('/create-order', createOrderController);

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})