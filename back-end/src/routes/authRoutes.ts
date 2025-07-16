import { Router } from "express";
import { login, logout, signup } from "../controllers/auth";

const router = Router()

router.post("/signup" , signup)
router.post("/login", login)
router.post("/logout" , logout)



export default router