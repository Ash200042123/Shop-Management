import { Router } from "express";
import { createOrderController, getOrderByOrderIdController, getAllOrdersByUserIdController, getAllOrdersController, updateOrderStatusController, deleteOrderController } from "../controllers/order-controller";

const router = Router();

router.post('/create-order', createOrderController);
router.get('/orders/user/:userId', getAllOrdersByUserIdController);
router.get('/orders/:orderId', getOrderByOrderIdController);
router.get('/orders', getAllOrdersController);
router.put('/orders',updateOrderStatusController);
router.delete('/orders',deleteOrderController);

export default router;