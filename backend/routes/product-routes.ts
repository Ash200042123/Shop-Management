import { Router } from "express";
import { addProductController, deleteProductController, getAllProductsController, getProductController, updateProductController } from '../controllers/product-controller';

const router = Router();


router.post('/add-product',addProductController);
router.get('/products',getAllProductsController);
router.get('/products/:name',getProductController);
router.put('/products/:name',updateProductController);
router.delete('/products/:name', deleteProductController);

export default router;