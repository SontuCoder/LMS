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
//     async getAllCourses() {
//         try {
//             return await Course.find({});
//         } catch (error) {
//             throw new Error(`Error fetching courses: ${error.message}`);
//         }
//     },

//     // Get course by ID
//     async getCourseById(courseId) {
//         try {
//             return await Course.findById(courseId);
//         } catch (error) {
//             throw new Error(`Error fetching course: ${error.message}`);
//         }
//     },

//     // Update course
//     async updateCourse(courseId, updateData) {
//         try {
//             return await Course.findByIdAndUpdate(courseId, updateData, { new: true });
//         } catch (error) {
//             throw new Error(`Error updating course: ${error.message}`);
//         }
//     },

//     // Delete course
//     async deleteCourse(courseId) {
//         try {
//             return await Course.findByIdAndDelete(courseId);
//         } catch (error) {
//             throw new Error(`Error deleting course: ${error.message}`);
//         }
//     }
// };

