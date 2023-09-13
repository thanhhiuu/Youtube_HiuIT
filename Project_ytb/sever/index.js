// Framework Node.js để xây dựng web
import express from "express";
// Mongoose giúp tương tác với cơ sở dữ liệu
import mongoose from "mongoose";
// Thư viện hỗ trợ load các biến môi trường từ file .env
import dotenv from "dotenv";
import userRouter from "./router/users.js";
import authRouter from "./router/auths.js";
import commentRouter from "./router/comments.js";
import videoRouter from "./router/videos.js";
import cookieParser from "cookie-parser";


// Khởi tạo ứng dụng express
const app = express();

// Cấu hình biến môi trường từ tệp .env
dotenv.config();



// Kết nối đế cơ sở dữ liệu Mongoose
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.error("Error connecting to DB:", err);
    });
};


// Sử dụng phần mềm trung gian để xử lý dữ liệu JSON
app.use(express.json());


// CookieParser là 1 Middleware cho phép bạn lưu trữ cookie từ ứng dụng của bạn
// Thường thì cookie sẽ lưu thông tin đăng nhập và lưu trữ cài đặt cá nhân,...
app.use(cookieParser());

// Định tuyến cho các API 
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/video", videoRouter);



// Định nghĩa 1 Middleware để xử lý lỗi chung (handler error)
app.use((err, req, res, next) => { // bắt buộc phải sắp xếp đúng vị trí trong callback này
  const status = err.status || 500;
  const message = err.message || "Có lỗi xảy ra !!";

  return res.status(status).json({
    success: false,
    status,
    message
  });
});


// Lắng nghe cổng 9000 và thực hiện kết nối đến cơ sở dữ liệu
app.listen(9000, () => {
  connect();
  console.log("Kết nối thành công với sever localhost://9000");
});





