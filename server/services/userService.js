import redis from "../config/redis.js";


// get user by id


export const getUserById = async(id, res)=>{
    const userJson = await redis.get(id);
    const user = JSON.parse(userJson);
    res.status(201).json({
        succecc: true,
        user
    })
}