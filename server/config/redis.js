import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false, 
    }
});

redis.on('connect', () => {
    console.log("Redis connected");
});

redis.on('error', (err) => {
    console.error("Redis connection error:", err);
});

export default redis;
