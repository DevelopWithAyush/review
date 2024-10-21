import express from "express";
import { adminAuthenticated } from "../middleware/auth.js";
import { handleAllBusiness, handleBusiness } from "../controller/business.js";

const router = express.Router();
router.get("/", handleAllBusiness);
router.use(adminAuthenticated);
router.post("/", handleBusiness);

export default router;
