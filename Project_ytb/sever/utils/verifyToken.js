// Thư viện jsonwebtoken giúp xác thực JSON WEB TOKEN
import jwt from "jsonwebtoken";
import { createError } from "../error.js";


export const verifyToken = (req, res, next) => {

    // Dòng này lấy giá trị từ cookie có tên access_token
    // Đây là cách truy xuất token được gửi từ máy khách
    const token = req.cookies.access_token; // Sửa thành req.cookies

    // Kiểm tra cookie có tồn tại không => false: người dùng chưa xác thực
    if (!token) return next(createError(401, "Cookie không hợp lệ!")); // Sửa chính tả


    // Dòng này được xác thực và giải mã token 
    // Tham số thứ nhất token cần xác thực
    // Thứ hai là mã bí mật lưu ở .env để giải mã token
    // Thứ ba là callback => false: Xuất lỗi, true: xuất giá trị
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token không hợp lệ!")); // Sửa chính tả

        // user được lấy từ callback 
        // Sau khi xác thực thành công và giải mã JWT thành công 
        // Thông thi người dùng được lấy từ đoạn mã hóa sẽ gán cho user
        // Sau đó req.user sẽ nhận thông tin từ user
        req.user = user;
        next();
    });
};

export default verifyToken