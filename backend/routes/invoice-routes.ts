import { Router } from "express";
import { deleteInvoiceByOrderController, deleteInvoiceByUserController, getAllInvoicesController, getInvoiceByOrderIdController, getInvoiceByUserIdController } from "../controllers/invoice-controller";


const router = Router();

router.get('/invoices/:orderId', getInvoiceByOrderIdController);
router.get('/invoices/:userId', getInvoiceByUserIdController);
router.get('/invoices', getAllInvoicesController);
router.delete('/invoices',deleteInvoiceByUserController);
router.delete('/invoices',deleteInvoiceByOrderController);

export default router;