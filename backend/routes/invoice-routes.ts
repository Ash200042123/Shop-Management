import { Router } from "express";
import { deleteInvoiceByOrderController, deleteInvoiceByUserController, getAllInvoicesController, getInvoiceByIdController, getInvoiceByOrderIdController, getInvoiceByUserIdController } from "../controllers/invoice-controller";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";


const router = Router();

router.get('/invoices/:id',authMiddleware, getInvoiceByIdController);
router.get('/invoices/:orderId',authMiddleware, getInvoiceByOrderIdController);
router.get('/invoices/:userId',authMiddleware, getInvoiceByUserIdController);
router.get('/invoices',authMiddleware, getAllInvoicesController);
router.delete('/invoices',adminMiddleware,deleteInvoiceByUserController);
router.delete('/invoices',adminMiddleware,deleteInvoiceByOrderController);

export default router;