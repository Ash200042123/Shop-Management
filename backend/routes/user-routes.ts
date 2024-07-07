import { Router } from "express";
import { deleteUserController, getAllUsersController, getUserController, loginController, signupController, updateEmailController, updatePasswordController, updateUnitSoldsByUserController } from "../controllers/user-controller";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";


const router = Router();

router.post('/signup',signupController);
router.post('/login', loginController);
router.get('/employees',adminMiddleware,getAllUsersController);
router.get('/user/:userId',authMiddleware,getUserController);
router.put('/user/update',authMiddleware,updateUnitSoldsByUserController);
router.put('/user/:userId',authMiddleware, updateEmailController);
router.put('/update-password',authMiddleware, updatePasswordController);
router.delete('/user/:id',adminMiddleware, deleteUserController);

export default router;