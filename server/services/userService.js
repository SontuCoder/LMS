import userModel from "../models/user.model.js"


// get user by id


export const getUserById = async(id, res)=>{
    const user = await userModel.findById(id);
    res.status(201).json({
        succecc: true,
        user
    })
}