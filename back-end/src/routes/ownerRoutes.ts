import express from "express";
import { Router } from "express";
import { verifyRole } from "../middleware/verifyRole";
import { getOwnerWithProperties } from "../controllers/owner";


const router = Router();


router.get('/:ownerId',verifyRole(["owner"]),getOwnerWithProperties)





export default router;
