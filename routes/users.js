import express from "express";
import {
  externalSignin,
  signin,
  signup,
  deleteUser,
  updateProgress,
  resetProgress,
  saveGame,
  resetPassword,
  changePassword,
  updateUserAccount,
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
router.post("/resetpassword", resetPassword);
router.patch("/changepassword/:token", changePassword);
router.patch("/updateuseraccount/:id", auth, updateUserAccount);

export default router;
