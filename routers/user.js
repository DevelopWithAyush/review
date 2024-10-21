import express from "express";
import { handleLogin, handleLogout, handleMyProfile, handleSignup } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.use(isAuthenticated);

router.get("/logout", handleLogout);
router.get("/me", handleMyProfile);

export default router;
