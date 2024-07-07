import { Request, Response } from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductByName, updateProduct } from '../services/product-service';


export const addProductController = async(req:Request, res:Response)=>{
    const {name, description, price, stock} = req.body;

    try{
        if(name===undefined || description===undefined || price===undefined || stock===undefined){
            return res.status(400).json({error: 'Please fillup all the fields!'});
        }

        const priceFloat = parseFloat(price);
        const stockInt = parseInt(stock); 

        if (isNaN(priceFloat) || priceFloat <= 0  || isNaN(stockInt) || stockInt <= 0) {
            return res.status(400).json({ error: 'Invalid price value!' });
        }

        const newProduct = await addProduct(name, description, priceFloat, stockInt);
        return res.status(200).json({message:'Product Added!', product: newProduct});
    }catch(error){
        console.error('Error occured:',error);
        return res.status(500).json({error:'Internal Server Error'});
    }
}


export const getAllProductsController = async(req:Request,res:Response)=>{
    try{
        const products = await getAllProducts();
        return res.status(200).json({products:products});
    }catch(error){
        console.error('Error occured:',error);
        return res.status(500).json({error:'Internal Server Error'});
    }
}


export const getProductController = async(req:Request, res:Response)=>{
    const name = req.params.name;

    try{
        if(name===undefined) return res.status(400).json({error: 'Please provide a name!'});

        const product= await getProductByName(name);

        if(!product) return res.status(500).json({message:'No products found'});

        return res.status(200).json({product:product});

    }catch (error: any) {
        if (error.message === 'Product name is required!') {
            return res.status(400).json({ error: error.message });
        } else if (error.code === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: error.message });
        } else {
            console.error('Error occurred:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


export const updateProductController= async(req:Request, res:Response)=>{
    const { updatedName, description, price, stock} = req.body;
    const name = req.params.name;
    

    try {
        if(name===undefined) return res.status(400).json({error: 'Please provide a name!'});
        const priceFloat = parseFloat(price);
        const stockInt = parseInt(stock); 
        const product=await updateProduct(name,updatedName, description, priceFloat, stockInt);
        return res.status(200).json({product:product});
    }catch (error: any) {
        if (error.message === 'Product name is required!') {
            return res.status(400).json({ error: error.message });
        } else if (error.code === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: error.message });
        } else {
            console.error('Error occurred:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


export const deleteProductController = async(req:Request,res:Response)=>{
    
    const name = req.params.name;
    try {
        if(name===undefined) return res.status(400).json({error: 'Please provide a name!'});

        const product=await deleteProduct(name);
        return res.status(200).json({product:product});
    }catch (error: any) {
        if (error.message === 'Product name is required!') {
            return res.status(400).json({ error: error.message });
        } else if (error.code === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({ error: error.message });
        } else {
            console.error('Error occurred:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}