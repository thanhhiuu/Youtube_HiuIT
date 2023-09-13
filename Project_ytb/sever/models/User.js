import mongoose from "mongoose";


const UserSchema = new mongoose.Schema( // Đây là định nghĩa của mô hình người dùng
    {

        // // Mô hình này định nghĩa các trường dữ liệu cho người dùng như username, password, email,...
        // userId: {

        //     // Kiểu dữ liệu
        //     type: String,
        //     // Duy nhất
        //     unique: true
        // },
        username: {

            // Kiểu dữ liệu
            type: String,
            // Bắt buộc
            required: true,
            // Duy nhất
            unique: true
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        imgUlr: {
            type: String,
        },
        subscribers: {
            type: Number,
            // Mặc định
            default: 0
        },
        subscribersUser: {
            type: [String],
            default: []
        },
        fromGoogle: {
            type: Boolean,
            default: false
        }
    },

    // Sử dụng để tự động thêm hai trường createdAt và updatedAt
    // createdAt theo dõi thời gian tạo
    // updatedAt theo dõi thời gian cập nhật
    { timestamps: true }
)

export default mongoose.model("User", UserSchema)