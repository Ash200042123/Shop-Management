import { Router } from "express";
import {
  deleteUserController,
  getAllUsersController,
  getUserController,
  loginController,
  signupController,
  updateEmailController,
  updatePasswordController,
  updateUnitSoldsByUserController,
} from "../controllers/user-controller";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validator-middleware";
import {
  loginSchema,
  signupSchema,
  getUserSchema,
  updateUnitSoldsByUserSchema,
  updateEmailSchema,
  updatePasswordSchema,
  deleteUserSchema,
} from "../validators/user-validator";

const router = Router();

router.post("/signup", validateRequest(signupSchema), signupController);
router.post("/login", validateRequest(loginSchema), loginController);
router.get("/employees", adminMiddleware, getAllUsersController);
router.get(
  "/user/:userId",
  authMiddleware,
  validateRequest(getUserSchema),
  getUserController
);
router.put(
  "/user/update",
  authMiddleware,
  validateRequest(updateUnitSoldsByUserSchema),
  updateUnitSoldsByUserController
);
router.put(
  "/user/:userId",
  authMiddleware,
  validateRequest(updateEmailSchema),
  updateEmailController
);
router.put(
  "/update-password",
  authMiddleware,
  validateRequest(updatePasswordSchema),
  updatePasswordController
);
router.delete(
  "/user/:id",
  adminMiddleware,
  validateRequest(deleteUserSchema),
  deleteUserController
);

export default router;
