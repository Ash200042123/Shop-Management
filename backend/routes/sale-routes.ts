import { Router } from "express";
import { createSaleController, getAllSalesController, getSalesByProductController, getSalesByUserController, getSalesForPastMonth, getSalesForPastWeek, getSalesProductWiseController, updateSaleController } from "../controllers/sale-controller";
import { deleteSaleById } from "../repositories/sale-repository";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validator-middleware";
import { deleteSaleSchema, getSalesByProductSchema, getSalesByUserSchema, postSaleSchema, updateSaleSchema } from "../validators/sale-validator";


const router= Router();

router.post("/sales",authMiddleware,validateRequest(postSaleSchema),createSaleController);
router.get("/sales/week",authMiddleware,getSalesForPastWeek);
router.get("/sales/month",authMiddleware,getSalesForPastMonth);
router.get("/sales/details",authMiddleware,getAllSalesController);
router.get("/sales",authMiddleware,getSalesProductWiseController);
router.get("/sales/:userId",authMiddleware,validateRequest(getSalesByUserSchema),getSalesByUserController);
router.get("/sales/:productId",authMiddleware,validateRequest(getSalesByProductSchema),getSalesByProductController);
router.put("/sales/:salesId",adminMiddleware,validateRequest(updateSaleSchema),updateSaleController);
router.delete("/sales/:saleId",adminMiddleware,validateRequest(deleteSaleSchema),deleteSaleById);


export default router;