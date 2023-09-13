import mongoose from "mongoose";


const VideoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true,
            unique: true
        },
        imgUlr: {
            type: String,
        },
        videoUlr: {
            type: String,
        },
        views: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String],
            default: []
        },
        like: {
            type: [String],
            default: []
        },

        dislike: {
            type: [String],
            default: []
        },
    },
    { timestamps: true }
);


export default mongoose.model("Video", VideoSchema)