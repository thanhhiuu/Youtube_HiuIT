import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";


// Tạo 1 route handler để tạo 1 video và lưu nó vào cơ sở dữ liệu
export const addVideo = async (req, res, next) => {

    // Tạo 1 đối tượng từ Model Video với userId được lấy từ thuộc tính Video
    // req.user.id lấy từ JWT được lưu vào phiên đăng nhập
    // req.body là thông tin từ phía client (Yêu cầu (req) HTTP như post put) cung cấp các thông tin để tạo 1 Video
    // Dấu 3 chấm giúp trải các trường dữ liệu dữ liệu có trong req.body (Vi du: UserId, pass, name,...) để thêm vào Video đã tạo 
    const newVideo = new Video({ userId: req.user.id, ...req.body })
    try {
        // Lưu đối tượng Video vào csdl thông qua methods save của mongoose
        const saveVideo = await newVideo.save();
        res.status(200).json(saveVideo);
    } catch (error) {
        next(error);
    }
}

// Đoạn này giúp xóa video dựa trên ID video
export const deleteVideo = async (req, res, next) => {
    try {
        // Đoạn này giúp tìm ra id video được cung cấp cần xóa
        const video = await Video.findById(req.params.id)
        // Nếu không có id thông báo lỗi
        if (!video) return next(createError(404, "Xóa video không thành công"));

        // Kiểm tra so sánh ID được đưa vào ULR ( req.params.id) và ID video (req.user.id) đang có có bằng nhau không
        if (req.user.id === req.params.id) {
            // Nếu bằng nhau xóa video
            await Video.findByIdAndDelete(req.params.id)
        }
        else {
            next(createError(403, "Khong tim thay video để xóa"));
        }
        req.status(200).json("Xóa video không thành công");

    } catch (error) {
        next(error);
    }
}


// Cập nhật thông tin video dựa trên id video
export const updateVideo = async (req, res, next) => {
    try {
        // Tìm kiếm video thông qua id được cung cấp
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Cập nhật video không thành công"));

        // Kiểm tra xem id video được xác thực và id được đưa vào url có bằng nhau không
        if (req.user.id === req.params.id) {
            // Sau khi kiểm tra nếu bằng nhau thì xóa
            // Thông qua findByIdAndUpdate() tìm kiếm id tới id được cung cấp trong url và xóa
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {

                // Sử dụng $set để đặt lại các trường trong video bằng req.body
                $set: req.body
            },

                //  Giup trả về video khi cập nhật
                { new: true })
        }
        else {
            next(createError(403, "Khong tim thay video để câp nhật"));
        }
    } catch (error) {
        next(error);
    }
}


// Route Handler lấy ra id của 1 video
export const getVideo = async (req, res, next) => {
    try {

        // Tìm kiếm video thông qua id của video
        const videoGet = await Video.findById(req.params.id);
        // Trả về yêu cầu theo dạng json
        res.status(200).json(videoGet);

    } catch (error) {
        next(error);
    }
}

// Lấy ra danh sách video đã được người dùng hiện tại đăng ký 
export const sub = async (req, res, next) => {
    try {
        // Tìm kiếm video hiện tại thông qua id đang lưu phiên đaưng nhập JWT
        const user = await User.findById(req.user.id);

        // Lấy mảng subscriberUser từ user
        const subscribersChannel = user.subscribersUser;

        // Sử dụng Promise.all để thực hiện tìm kiếm video từ các người dùng đã đăng ký
        // Tìm kiếm video dựa trên id người dùng
        const list = await Promise.all(

            // thông qua map để tạo ra các giá trị mới thông qua giá trị có sẵn
            subscribersChannel.map((channelID) => {

                // Tìm kiếm video dựa trên userId từ các trường trong video
                // Trả về video hiện tại đang đăng ký 
                return Video.find({ userId: channelID })
            })
        )

        // Làm phằng khi các mảng được lòng nhau thông qua .flat()
        res.status(200).json(list.flat());

    } catch (error) {
        next(error);
    }
}

// Lấy ngẫu nhiên video có trong csdl 
export const random = async (req, res, next) => {
    try {

        // Sử dụng hoạt động aggregate trong mongoose
        // aggregate Cho phép thực hiện các phép tính toán phức tạp (sắp xếp, tính tổng, tính trung bình, lọc, .....)
        // Một số ví dụ về các giai đoạn trong Aggregation framework của MongoDB bao gồm: 
        // $match, $group, $project, $sort, $limit, $skip, $unwind,... (CẦN TÌM HIỂU)


        // $sample giúp lấy ngẫu nhiên 1 collection của Video 
        const videoRan = await Video.aggregate([{ $sample: { size: 50 } }]);
        res.status(200).json(videoRan);

    } catch (error) {
        next(error);
    }
}


export const getByTag = async (req, res, next) => {

    // Lấy tham số truy vấn tags và sử dụng split để tách mảng bằng dấu phẩy
    const tags = req.query.tags.split(",");
    try {
        // Tim kiếm video dựa trên tags. Dùng $in để so sánh tags trong video có trong mảng tách không
        // Limit 20 có nghĩa lấy ra tối đa 20 video 
        // $in là 1 toán tử so sánh kiểm tra xem một giá trị có tồn tại hay không
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);

        // Nếu có trả về videos theo kiểu json
        res.status(200).json(videos);

    } catch (error) {
        next(error);
    }
}

// Tìm kiếm các video thông qua tên (title) của video đó
export const searchs = async (req, res, next) => {
    // từ khóa truy vấn q trong url
    const query = req.query.q;
    try {
        // Tim kiếm các trường title có trùng với req.query.q hay không
        const videos = await Video.find({

            // $regex dùng để tìm kiếm dựa trên biểu thức chính quy
            // $options giúp tùy chọn không phân biệt chữ thường chữ hoa
            title: { $regex: query, $options: "i" },


            // Giới hạn số lượng trả về là 40 video
        }).limit(40)

        res.status(200).json(videos);

    } catch (error) {
        next(error);
    }
}


// Tăng view của video
export const views = async (req, res, next) => {
    try {
        // Tìm kiếm và cập nhật thông qua id trên url
        await Video.findByIdAndUpdate(req.params.id, {


            // Dùng $inc để tăng số lượt view lên 1 sau mỗi thao tác
            $inc: { views: 1 }
        });
        res.status(200).json("Đã thêm view thành công");

    } catch (error) {
        next(error);
    }
}


// 
export const trend = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const subscribersUser = user.subscribersUser;

        const list = Promise.all(
            subscribersUser.map((channelID) => {
                return Video.find({ videoId: channelID });
            })
        )
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}