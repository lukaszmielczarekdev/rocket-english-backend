import express from "express";
import { getTrophies } from "../controllers/trophies.js";

const router = express.Router();

router.get("/trophy", getTrophies);

export default router;
