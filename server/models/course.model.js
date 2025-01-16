import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,

});

const linkSchema = new mongoose.Schema({
    title: String,
    url: String
});

const commentSchema = new mongoose.Schema({
    user: Object,
    comment: String,
    commentReplies: [Object],
})

const courseData = new mongoose.Schema({
    title: String,
    description: String,
    videoUrl: String,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    question: [commentSchema]
});

const courseSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "Please enter course price"],
    },
    estimatedPrice: {
        type: Number,
    },
    thumbnail: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    tags: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    demoUrl: {
        type: String,
        required: true,
    },
    benefits: [{
        title: String,
    }],
    prerequisites: [{
        title: String,
    }],
    reviews: [reviewSchema],
    courseData: [courseData],
    ratings: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0,
    }
});

const courseModel = mongoose.model("Course", courseSchema);
export default  courseModel;