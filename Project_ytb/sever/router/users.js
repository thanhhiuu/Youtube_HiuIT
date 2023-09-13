import express from "express"
import { update, deleteUser, disLike, getUser, like, subscribe, unSubscribe } from "../controller/user.js";
import { verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

// Update
router.put("/:id", verifyToken, update)
// delete user
router.delete("/deleteUser/:id", verifyToken, deleteUser)
// get user
router.get("/find/:id", getUser)
// subscribe
router.put("/subscribe/:id", verifyToken, subscribe)
// unSubscribe
router.put("/unsubscribe/:id", verifyToken, unSubscribe)
// like
router.put("/like/:videoId", verifyToken, like)
//disList
router.put("/dislike/:videoId", verifyToken, disLike)
export default router;