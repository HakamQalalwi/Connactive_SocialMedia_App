import express from "express";
import { getUser, getUserFriends, addRemoveFriend, updateSocialMediaLinks, searchUsers } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/search", verifyToken, searchUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.put("/:id/socialMediaLinks", updateSocialMediaLinks);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
