import { Router } from "express";
import { loginController, signupController, updatePasswordController, updateUnitSoldsByUserController } from "../controllers/user-controller";


const router = Router();

router.post('/signup',signupController);
router.post('/login', loginController);
router.put('/user/update',updateUnitSoldsByUserController);
router.put('/update-password', updatePasswordController);

export default router;