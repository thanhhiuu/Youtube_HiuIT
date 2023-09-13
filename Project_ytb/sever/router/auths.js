import express from "express"
import { Google, LognOut, signin, signup } from "../controller/auth.js";


const router = express.Router();

// Tạo 1 người dùng User
// Định tuyến cho việc người dùng đăng ký
router.post("/signup", signup)

// Tạo nơi đăng nhap
router.post("/signin", signin)



router.post("/lognout", LognOut)

// Tạo GOOGLE Auth
router.post("/google", Google)


export default router;



// npm install bcryptjs => mã hóa password