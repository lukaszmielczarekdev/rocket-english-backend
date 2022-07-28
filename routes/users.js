import express from "express";
import {
  externalSignin,
  signin,
  signup,
  deleteUser,
  updateProgress,
  resetProgress,
  saveGame,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/externalsignin", externalSignin);
router.delete("/:id", auth, deleteUser);
router.patch("/updateprogress", auth, updateProgress);
router.patch("/resetprogress", auth, resetProgress);
router.patch("/savegame", auth, saveGame);

export default router;
