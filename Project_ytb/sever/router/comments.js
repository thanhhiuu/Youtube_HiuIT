import express from "express"
import { } from "../controller/user.js";
import { verifyToken } from "../utils/verifyToken.js";
import { addComment, deleteComment, getComment } from "../controller/comment.js";


const router = express.Router();

router.post("/", verifyToken, addComment);
router.get("/delete/:id", verifyToken, deleteComment);
router.get("/:videoId", getComment);
export default router;