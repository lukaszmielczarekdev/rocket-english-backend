import express from "express";
import { getTrophies } from "../controllers/trophies.js";

const router = express.Router();

router.get("/", getTrophies);

export default router;
