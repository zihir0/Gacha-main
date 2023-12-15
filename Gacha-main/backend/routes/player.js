import express from "express";
import { deletePlayer, getPlayer, getPlayers } from "../controllers/player.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getPlayer);
router.get("/", verifyToken, getPlayers);

router.delete("/:id", verifyToken, deletePlayer);

export default router;
