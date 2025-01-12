import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

const redisClient = ()=>{
    if(process.env.REDIS_URL){
        console.log("Redis connected");
    }else {
        console.log("Redis not connected");
    }
}

const redis = new Redis(redisClient());

export default redisClient;