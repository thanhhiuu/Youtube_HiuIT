
import { createError } from "../error.js";
import Comments from "../models/Comments.js";
import Video from "../models/Video.js";



// Giup tạo một bình luận và lưu bình luận vào csdl
export const addComment = async (req, res, next) => {
    try {

        // Tạo 1 bình luận mới thông qua id đang hiện hành (Đăng nhập) 
        // ...req.body lấy tất cả đổi tượng của req.body và thêm vào newComment
        const newComment = new Comments({ userId: req.user.id, ...req.body })


        // Lưu bình luận mới vào csdl
        const saverComment = await newComment.save();

        // trả về bản sao của người bình luận theo kiểu json
        res.status(200).json(saverComment);
    } catch (error) {
        next(error);
    }
}


// Giup xóa 1 bình luận thông qua req.params.id được chỉ định
export const deleteComment = async (req, res, next) => {
    try {

        // findById giúp tim ra bình luận có id được chỉ định
        const comment = await Comments.findById(req.params.id);

        // findById giúp tìm ra video có id được chỉ định thông qua req.params.id
        const video = await Video.findById(req.params.id);


        // Kiểm tra xem người dùng hiện tại có phải là người bình luận hay tác giả của video hay không
        // Nếu có thì cho phép xóa
        if (req.user.id == comment.userId || req.user.id == video.userId) {

            // Dùng await để chờ cho việc thực hiện xóa hoàn thành 
            await Comments.findByIdAndDelete(req.params.id)
            res.status(200).json("Xóa comment thành công");
        }
        else {
            next(createError(403, "Khong tim thay comment để xoa"));
        }
    } catch (error) {
        next(error);
    }
}

// Giup tìm tất cả bình luận có videoId được lấy thông qua req.params.id được chỉ định
export const getComment = async (req, res, next) => {
    try {
        // Find tìm tất cả bình luận có videoId được cung cấp 
        const getComment = await Comments.find({ videoId: req.params.videoId });
        res.status(200).json(getComment);
    } catch (error) {
        next(error);
    }
}