import { createProduct, deleteProductByName, findAllProducts, findProduct, updateProductByName } from "../repositories/product-repository"


export const addProduct = async(name:string, description:string, price:number, stock:number) =>{
    const isExistingProduct = await findProduct(name);

    if(isExistingProduct){
        throw new Error('Product already exists!');
    }

    const newProduct = await createProduct(name, description, price, stock);
    return newProduct;
}


export const getAllProducts = async()=>{
    const products = await findAllProducts();
    return products;
}


export const getProductByName = async(name:string)=>{
    if(!name){
        throw new Error('Product name is required!');
    }
    const product=await findProduct(name);

    if(!product){
        const error: any = new Error('Product not found!');
        error.code = 'PRODUCT_NOT_FOUND';
        throw error;
    }

    return product;
}


export const updateProduct= async(name:string,updatedName?:string, updatedDescription?:string, updatedPrice?:number, updatedStock?:number)=>{
    if(!name){
        throw new Error('Product actual name is required!');
    }

    if(!(updatedName && updatedDescription && updatedPrice && updatedStock)){
        throw new Error('Please select at least one field to update!');
    }

    const isExistingProduct = await findProduct(name);

    if(!isExistingProduct){
        const error: any = new Error('Product not found!');
        error.code = 'PRODUCT_NOT_FOUND';
        throw error;
    }

    const product = await updateProductByName(isExistingProduct.name, updatedName, updatedDescription, updatedPrice, updatedStock);
    return product;
}


export const deleteProduct= async(name:string)=>{
    if(!name){
        throw new Error('Provide Product name to delete!');
    }

    const isExistingProduct = await findProduct(name);

    if(!isExistingProduct){
        const error: any = new Error('Product not found!');
        error.code = 'PRODUCT_NOT_FOUND';
        throw error;
    }

    const product= await deleteProductByName(isExistingProduct.name);
    return product;
}