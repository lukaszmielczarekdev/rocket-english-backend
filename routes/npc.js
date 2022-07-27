import express from "express";
import { getMercenaries } from "../controllers/npc.js";

const router = express.Router();

router.get("/mercenary", getMercenaries);

export default router;
