import redis from "../config/redis.js";
import userModel from "../models/user.model.js";


// get user by id
export const getUserById = async(id, res)=>{
    const userJson = await redis.get(id);
    const user = JSON.parse(userJson);
    res.status(201).json({
        succecc: true,
        user
    })
}

// get all users
export const getAllUsersServices = async(res)=>{
    const users = await userModel.find().sort({createdAt: -1});
    res.status(201).json({
        success: true,
        users
    });
}

// update user roal 
export const updateUserRoleServices = async(userId, role, res)=>{
    const user = await userModel.findByIdAndUpdate(userId, {role}, {new: true});    
    res.status(201).json({
        success: true,
        user
    });
};