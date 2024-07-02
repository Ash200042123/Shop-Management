import { Router } from "express";
import { deleteUserController, getAllUsersController, getUserController, loginController, signupController, updateEmailController, updatePasswordController, updateUnitSoldsByUserController } from "../controllers/user-controller";


const router = Router();

router.post('/signup',signupController);
router.post('/login', loginController);
router.get('/employees',getAllUsersController);
router.get('/user/:userId',getUserController);
router.put('/user/update',updateUnitSoldsByUserController);
router.put('/user/:userId', updateEmailController);
router.put('/update-password', updatePasswordController);
router.delete('/user/:id', deleteUserController);

export default router;