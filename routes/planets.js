import express from "express";
import {
  getPlanets,
  createPlanet,
  deletePlanet,
  updatePlanet,
} from "../controllers/planets.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPlanets);
router.post("/", auth, createPlanet);
router.patch("/:id", auth, updatePlanet);
router.delete("/:id", auth, deletePlanet);

export default router;
