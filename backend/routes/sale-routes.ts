import { Router } from "express";
import { createSaleController, getAllSalesController, getSalesByProductController, getSalesByUserController, updateSaleController } from "../controllers/sale-controller";
import { deleteSaleById } from "../repositories/sale-repository";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";


const router= Router();

router.post("/sales",authMiddleware,createSaleController);
router.get("/sales",authMiddleware,getAllSalesController);
router.get("/sales/:userId",authMiddleware,getSalesByUserController);
router.get("/sales",authMiddleware,getSalesByProductController);
router.put("/sales/:salesId",adminMiddleware,updateSaleController);
router.delete("/sales/:saleId",adminMiddleware,deleteSaleById);


export default router;