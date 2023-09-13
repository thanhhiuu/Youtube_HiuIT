import { createError } from "../error.js    "
import User from "../models/User.js";
import Video from "../models/Video.js";

// Thiết lập Router handler

// Đoạn mã này giúp cập nhật người dùng
export const update = async (req, res, next) => {

    // Dòng này check xem id từ ULR có giống id từ thông tin người dùng (JWT) hay không
    // => false: Xuất lỗi ==> return next(createError(403, "Khong cập nhật được dữ liệu"));
    if (req.params.id === req.user.id) {
        try {
            // Dòng này sử dùng bất đồng bộ await 
            // Sử dụng monggose để tìm và cập nhật bảng ghi của người dùng thông qua ID được cung cấp ( User.findByIdAndUpdate(req.params.id)
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    // ($set) Cập nhật các trường thông tin người dùng theo dữ liệu từ req.body 
                    $set: req.body
                },
                // Trả về bản ghi cập nhật (giúp ktra đã update chưa)
                { new: true } // true or false
            );
            // Trả về dạng JSON với dữ liệu người dùng đã cung cấp
            res.status(200).json(updateUser)
        } catch (err) {
            // Xuất lỗi
            next(err);
        }
    } else {
        return next(createError(403, "Khong cập nhật được dữ liệu"));
    }
}

// Đoạn này giúp xóa người dùng thông qua ID ra khỏi database
export const deleteUser = async (req, res, next) => {
    // So sánh giữa id ULR và id người dùng đăng nhập
    if (req.params.id === req.user.id) {
        try {
            // Lấy ra người dùng theo id đó và xóa ra khỏi csdl
            await User.findByIdAndDelete(
                // Dựa trên id người dùng cần xóa
                req.params.id
            );
            res.status(200).json("Xóa thành công !!")
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "Khong cập nhật được dữ liệu"));
    }
}

// Tìm kiếm người dùng thông qua id
export const getUser = async (req, res, next) => {
    try {
        // Tìm kiếm id người dùng findById
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser)
    } catch (err) {
        next(err)
    }
}
// Thực hiện thao tác đăng ký người dùng cho người dùng khác
export const subscribe = async (req, res, next) => {
    try {
        // Tìm và cập nhật người dùng
        await User.findByIdAndUpdate(req.user.id, {
            // Sử dụng $push để thêm id của người dùng đã đăng ký vào subscribersUser
            $push: { subscribersUser: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            // Sử dụng $inc để tăng subscribers: + 1
            // Cứ mỗi người dùng đăng ký tăng lên 1
            $inc: { subscribers: 1 }
        })
        res.status(200).json("Đăng ký thành công !")
    } catch (err) {
        next(err)
    }
}


// Hủy đăng kỳ người dùng mà mình đã đăng ký
export const unSubscribe = async (req, res, next) => {
    try {
        // Tìm ra người người dùng và cập nhật thông qua id
        await User.findByIdAndUpdate(req.user.id, {
            // $pull Dùng để loại bỏ id người dùng đã đăng ký ra khỏi mảng subscribersUser
            $pull: { subscribersUser: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            // $inc giúp giảm đi 1 người đã đăng ký sau khi hủy đăng ký
            $inc: { subscribers: -1 }
        })
        res.status(200).json("Huy Đăng ký thành công !")
    } catch (err) {
        next(err)
    }
}
export const like = async (req, res, next) => {

    // Lấy ra id người dùng đang đăng nhập     
    const id = req.user.id;

    // Lấy ra videoId của người dùng hiện tại đang xem  
    const videoId = req.params.videoId;
    try {
        // Tìm kiếm và cập nhật video thông qua videoId của video
        await Video.findByIdAndUpdate(videoId, {

            // Sau đó thêm id của người vào like nếu chưa tồn tại
            $addToSet: { like: id },
            // Và xóa id người dùng ra khỏi dislike nếu đã tồn tại trước đó
            $pull: { dislike: id },

        })
        res.status(200).json("like thanh cong")
    } catch (err) {
        next(err)
    }
}
export const disLike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislike: id },
            $pull: { like: id }
        })
        res.status(200).json("dislike thanh cong")
    } catch (err) {
        next(err)
    }
}