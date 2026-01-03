import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.js";
import { isUserAuthorized } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', isUserAuthorized, logoutUser);

export default router;