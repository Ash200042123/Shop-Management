import { Router } from "express";
import { deleteInvoiceByIdController, deleteInvoiceByOrderController, deleteInvoiceByUserController, getAllInvoicesController, getInvoiceByIdController, getInvoiceByOrderIdController, getInvoiceByUserIdController } from "../controllers/invoice-controller";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validator-middleware";
import { deleteInvoiceSchema, getInvoiceByIdSchema, getInvoiceByOrderIdSchema, getInvoiceByUserIdSchema } from "../validators/invoice-validator";


const router = Router();

router.get('/invoices/:id',authMiddleware,validateRequest(getInvoiceByIdSchema), getInvoiceByIdController);
router.get('/invoices/:orderId',authMiddleware,validateRequest(getInvoiceByOrderIdSchema), getInvoiceByOrderIdController);
router.get('/invoices/:userId',authMiddleware,validateRequest(getInvoiceByUserIdSchema), getInvoiceByUserIdController);
router.get('/invoices',authMiddleware, getAllInvoicesController);
// router.delete('/invoices',adminMiddleware,deleteInvoiceByUserController);
// router.delete('/invoices',adminMiddleware,deleteInvoiceByOrderController);
router.delete('/invoices/:invoiceId',adminMiddleware,validateRequest(deleteInvoiceSchema),deleteInvoiceByIdController);

export default router;