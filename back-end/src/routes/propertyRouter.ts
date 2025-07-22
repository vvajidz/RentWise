import express from "express";
import { properties, propertyId } from "../controllers/properties";

const router = express.Router();

router.get("/allproperty", properties );
router.get("/:id" , propertyId)

export default router;
