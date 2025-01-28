import courseModel from '../models/course.model.js';
    // Create a new course
export const createCourse = async (courseData, res) => {
        const course = await courseModel.create(courseData);
        res.status(201).json({
            success:true,
            course
        })
}

    // Get all courses
export const getAllCoursesService = async (res) => {
        const courses = await courseModel.find().sort({createdAt: -1});
        res.status(200).json({
            success:true,
            courses
        })
}