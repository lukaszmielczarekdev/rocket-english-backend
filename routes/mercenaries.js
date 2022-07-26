import express from "express";
import { getMercenaries } from "../controllers/mercenaries.js";

const router = express.Router();

router.get("/", getMercenaries);

export default router;
