import express from "express";
import { adminLogin, fetchUsers, getUsersByRole } from "../controllers/admin";
import { verifyAdmin } from "../middleware/adminCheck";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.get("/admin/users",verifyAdmin,fetchUsers)
router.get("/admin/users/:role",verifyAdmin,getUsersByRole)

export default router;
