import { Router } from "express";
import { addProductController, deleteProductController, getAllProductsController, getProductController, updateProductController } from '../controllers/product-controller';
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";

const router = Router();


router.post('/add-product',authMiddleware,addProductController);
router.get('/products',authMiddleware,getAllProductsController);
router.get('/products/:name',authMiddleware,getProductController);
router.put('/products/:name',adminMiddleware,updateProductController);
router.delete('/products/:name',adminMiddleware, deleteProductController);

export default router;