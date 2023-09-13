
import User from "../models/User.js";
// Thư viện mã hóa mật khẩu người dùng
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jws from "jsonwebtoken";


// Đây là hàm xử lý đăng ký khi người dùng đăng ký
// req đại diện cho đối tượng yêu cầu, res đại diện cho đối tượng phản hồi
export const signup = async (req, res, next) => {
    try {
        // Hai dòng tiếp giứp mã hóa mật khẩu
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash })


        // Sau đó được lưu vào cơ sở dữ liệu thong qua phương thức save
        await newUser.save();
        res.status(200).send("Người dùng đã tạo thành công");
    } catch (err) {
        // console.error("Error creating user:", error);
        next(createError(404, "lỗi đã xuất hiện auth.js"));
    }
}


export const signin = async (req, res, next) => {
    try {
        // Tìm kiếm người dùng trong cơ sở dữ liêu thông qua username
        // findOne là 1 methods của monggose cho phép tìm kiếm 1 bản ghi dựa trên điều khiển 
        const user = await User.findOne({ username: req.body.username })


        // Kiểm tra người dùng nếu không có => Xuất lỗi
        if (!user) return next(createError(404, "lỗi không có user"))


        // Kiểm tra password được gửi trong yêu cầu có giống như trong cơ sở dử liệu không  
        //  bcrypt.compare so sánh mật khẩu được gửi và mật khẩu được mã hóa trong csdl
        const isConnect = await bcrypt.compare(req.body.password, user.password)


        // Ktra lỗi nếu mật khẩu không trùng
        if (!isConnect) return next(createError(404, "lỗi isConnect !!!"))

        // jws.sign để ký một đối tượng (payload) thành 1 chuỗi JWT
        // "payload" là phần dữ liệu chứa thông tin được mã hóa trong một JWT.
        // id: user._id giúp xác thực người dùng sau này và duy trì phiên đăng nhập
        const token = jws.sign({ id: user._id }, process.env.JWT)

        // Dòng này xóa đi môi trường password
        // sử dụng kỹ thuật gọi "rest operator" trong JavaScript để tạo một bản sao mới của đối tượng 
        const { password, ...orther } = user._doc;


        // Phản hồi và gửi thông báo qua cookie
        res.cookie("access_token", token, {

            //Giup bảo mật cookie ngăn mã Js truy cập vào cookie này
            httpOnly: true
        }).status(200).json(orther) // Phản hồi dưới dạng json  
    } catch (err) {

        // console.error("Error creating user:", error);
        next(createError(404, "lỗi đã xuất hiện auth.js"));
    }
}


export const LognOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).json("Đăng xuất thành công");
    } catch (error) {
        next(error);
    }
}





export const Google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jws.sign({ id: user._id }, process.env.JWT)

            // Phản hồi và gửi thông báo qua cookie
            res.cookie("access_token", token, {

                //Giup bảo mật cookie ngăn mã Js truy cập vào cookie này
                httpOnly: true
            }).status(200).json(user._doc) // Phản hồi dưới dạng json  
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const saveUser = await newUser.save();
            const token = jws.sign({ id: user._id }, process.env.JWT)

            // Phản hồi và gửi thông báo qua cookie
            res.cookie("access_token", token, {

                //Giup bảo mật cookie ngăn mã Js truy cập vào cookie này
                httpOnly: true
            }).status(200).json(saveUser._doc) // Phản hồi dưới dạng json  
        }
    } catch (error) {
        next(error);
    }
}




