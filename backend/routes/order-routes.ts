import { Router } from "express";
import { createOrderController, getOrderByOrderIdController, getAllOrdersByUserIdController, getAllOrdersController, updateOrderStatusController, deleteOrderController } from "../controllers/order-controller";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();

router.post('/create-order',authMiddleware, createOrderController);
router.get('/orders/user/:userId',authMiddleware, getAllOrdersByUserIdController);
router.get('/orders/:orderId',authMiddleware, getOrderByOrderIdController);
router.get('/orders',authMiddleware, getAllOrdersController);
router.put('/orders',authMiddleware,updateOrderStatusController);
router.delete('/orders',authMiddleware,deleteOrderController);

export default router;