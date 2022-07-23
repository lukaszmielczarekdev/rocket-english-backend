import express from "express";
import {
  externalSignin,
  signin,
  signup,
  deleteUser,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/externalsignin", externalSignin);
router.delete("/:id", auth, deleteUser);

export default router;
