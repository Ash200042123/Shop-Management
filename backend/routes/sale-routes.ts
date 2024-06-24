import { Router } from "express";
import { createSaleController, getAllSalesController, getSalesByProductController, getSalesByUserController, updateSaleController } from "../controllers/sale-controller";
import { deleteSaleById } from "../repositories/sale-repository";


const router= Router();

router.post("/sales",createSaleController);
router.get("/sales",getAllSalesController);
router.get("/sales/:userId",getSalesByUserController);
router.get("/sales",getSalesByProductController);
router.put("/sales/:salesId",updateSaleController);
router.delete("/sales/:saleId",deleteSaleById);


export default router;