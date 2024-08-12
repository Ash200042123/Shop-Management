import { Router } from "express";
import { addProductController, deleteProductController, getAllProductsController, getProductController, updateProductController } from '../controllers/product-controller';
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validator-middleware";
import { addProductSchema } from "../validators/product-validator";

const router = Router();


router.post('/add-product',authMiddleware,validateRequest(addProductSchema),addProductController);
router.get('/products',authMiddleware,getAllProductsController);
router.get('/products/:name',authMiddleware,getProductController);
router.put('/products/:name',adminMiddleware,updateProductController);
router.delete('/products/:name',adminMiddleware, deleteProductController);

export default router;