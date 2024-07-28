import { Router } from "express";
import { createOrderController, getOrderByOrderIdController, getAllOrdersByUserIdController, getAllOrdersController, updateOrderStatusController, deleteOrderController } from "../controllers/order-controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validator-middleware";
import { createOrderSchema, deleteOrderSchema, getOrderByOrderIdSchema, getOrdersByUserIdSchema, updateOrderStatusSchema } from "../validators/order-validator";


const router = Router();

router.post('/create-order',authMiddleware,validateRequest(createOrderSchema), createOrderController);
router.get('/orders/user/:userId',authMiddleware,validateRequest(getOrdersByUserIdSchema), getAllOrdersByUserIdController);
router.get('/orders/:orderId',authMiddleware,validateRequest(getOrderByOrderIdSchema), getOrderByOrderIdController);
router.get('/orders',authMiddleware, getAllOrdersController);
router.put('/orders',authMiddleware,validateRequest(updateOrderStatusSchema),updateOrderStatusController);
router.delete('/orders',authMiddleware, validateRequest(deleteOrderSchema) ,deleteOrderController);

export default router;